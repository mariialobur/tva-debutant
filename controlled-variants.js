import './ux-v3.js';
import { CASES } from './data.js';

const STORAGE_KEY='tva_effective_case_m_variants_v1';
const SOURCE_URL='https://www.estv.admin.ch/fr/deroulement-dun-controle-tva';
const variants=[
  {
    id:'MA',
    short:'M-A · Convenues',
    title:'Facture en juin, paiement en juillet',
    facts:'La PME décompte selon les contre-prestations convenues. Une prestation imposable de CHF 10’000 est facturée le 20 juin 2026. Le client paie le 15 juillet 2026.',
    question:'Dans quelle période le chiffre d’affaires doit-il être déclaré dans cette variante ?',
    options:['T2 2026','T3 2026','Seulement lors du bouclement annuel','Uniquement après encaissement complet'],
    correct:0,
    why:'Mode convenu = logique de facturation. Le paiement de juillet ne déplace pas cette contre-prestation facturée en juin vers T3.'
  },
  {
    id:'MB',
    short:'M-B · Reçues',
    title:'Même facture, méthode reçues autorisée',
    facts:'Même prestation imposable de CHF 10’000, facture le 20 juin et paiement le 15 juillet 2026. Cette fois, l’entreprise est autorisée à décompter selon les contre-prestations reçues.',
    question:'Dans quelle période le chiffre d’affaires doit-il être déclaré dans cette variante ?',
    options:['T2 2026','T3 2026','Dans les deux périodes','La facture interdit la méthode reçues'],
    correct:1,
    why:'Mode reçu = logique d’encaissement. Avec un paiement le 15 juillet, la contre-prestation entre dans T3 dans les hypothèses de cette variante.'
  },
  {
    id:'MC',
    short:'M-C · Acompte',
    title:'Acompte avant la prestation finale',
    facts:'La PME décompte selon les contre-prestations convenues. Aucun décompte final n’est encore émis. Elle reçoit le 25 juin 2026 un acompte de CHF 4’000 pour une prestation imposable déterminée qui sera exécutée en août.',
    question:'Quel réflexe TVA faut-il appliquer à cet acompte dans cette variante ?',
    options:['Le déclarer en T2 2026','Attendre systématiquement T3 2026','Attendre uniquement la facture finale','Le traiter comme un don'],
    correct:0,
    why:'Le paiement anticipé est un fait TVA à traiter au moment de son encaissement dans cette hypothèse. Il ne faut pas attendre mécaniquement la facture finale.'
  }
];

let activeId='MA';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}}
function save(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function currentCase(){const select=document.querySelector('#caseSelect');const i=Number(select?.value);return Number.isInteger(i)?CASES[i]:null}
function currentMode(){return document.querySelector('[data-mode].active')?.dataset.mode||'learn'}
function masteredCount(){const done=load().done||{};return variants.filter(v=>done[v.id]).length}

function render(){
  document.querySelector('#controlledVariantsM')?.remove();
  if(currentCase()?.id!=='M'||currentMode()==='evaluate')return;
  const host=document.querySelector('#caseInfo');if(!host)return;
  const done=load().done||{};
  const active=variants.find(v=>v.id===activeId)||variants[0];
  const panel=document.createElement('section');panel.id='controlledVariantsM';panel.className='controlled-variants';
  panel.innerHTML=`<div class="cv-head"><div><span class="cv-eyebrow">Variantes contrôlées · Case M</span><h2>Convenues, reçues ou acompte ?</h2><p>Les mêmes dates donnent un résultat différent quand <strong>un seul fait déterminant</strong> change. Ces mini-cas complètent Case M sans modifier la progression 18/18.</p></div><div class="cv-progress"><strong>${masteredCount()}/3</strong><span>variantes maîtrisées</span></div></div>
  <div class="cv-tabs" role="tablist" aria-label="Variantes du Case M">${variants.map(v=>`<button type="button" role="tab" aria-selected="${v.id===active.id}" class="${v.id===active.id?'active':''} ${done[v.id]?'done':''}" data-cv-tab="${v.id}">${done[v.id]?'✓ ':''}${esc(v.short)}</button>`).join('')}</div>
  <article class="cv-card"><h3>${esc(active.title)}</h3><p class="cv-facts">${esc(active.facts)}</p><fieldset><legend>${esc(active.question)}</legend>${active.options.map((o,i)=>`<label><input type="radio" name="cv-${active.id}" value="${i}"><span>${esc(o)}</span></label>`).join('')}</fieldset><div class="cv-actions"><button type="button" class="btn primary" data-cv-check="${active.id}">Vérifier la variante</button><a href="${SOURCE_URL}" target="_blank" rel="noopener noreferrer">AFC — contrôle TVA ↗</a></div><div class="cv-feedback" aria-live="polite"></div></article>`;
  host.insertAdjacentElement('afterend',panel);
  panel.querySelectorAll('[data-cv-tab]').forEach(btn=>btn.addEventListener('click',()=>{activeId=btn.dataset.cvTab;render()}));
  panel.querySelector('[data-cv-check]')?.addEventListener('click',()=>check(active,panel));
}

function check(v,panel){
  const feedback=panel.querySelector('.cv-feedback');
  const selected=panel.querySelector(`input[name="cv-${v.id}"]:checked`);
  if(!selected){feedback.className='cv-feedback warn';feedback.textContent='Choisissez d’abord une réponse.';return}
  const ok=Number(selected.value)===v.correct;
  if(ok){const state=load();state.done={...(state.done||{}),[v.id]:true};save(state);feedback.className='cv-feedback ok';feedback.innerHTML=`<strong>✓ Correct.</strong> ${esc(v.why)}`;setTimeout(render,500)}
  else{feedback.className='cv-feedback bad';feedback.innerHTML=`<strong>✕ À revoir.</strong> ${esc(v.why)}`}
}

function schedule(){setTimeout(render,0)}
document.addEventListener('DOMContentLoaded',render);
document.addEventListener('change',e=>{if(e.target?.id==='caseSelect')schedule()});
document.addEventListener('click',e=>{if(e.target.closest?.('[data-case], [data-mode], [data-prev], [data-next]'))schedule()});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)render()});
