// TVA suisse — méthode effective · Niveau 1
// Atelier de synthèse centré uniquement sur le remplissage du décompte.

const STORAGE_KEY='tva_effective_atelier_declaration_v2';
const PASS_PERCENT=85;

const SOURCES=[
  ['Prototype AFC — méthode effective','https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf'],
  ['AFC — impôt sur les acquisitions','https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva'],
  ['AFC — décisions de taxation électroniques (DTe)','https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane']
];

const OPERATIONS=[
  'Ventes de services en Suisse: CHF 40’000 HT, taux normal.',
  'Exportation documentée de biens: CHF 15’000 HT.',
  'Conseil B2B à un client français: CHF 10’000 HT; lieu de la prestation en France selon les faits du cas.',
  'Loyer commercial avec option valablement exercée: CHF 12’000 HT.',
  'Avoir sur une vente suisse imposable déjà comprise dans le chiffre d’affaires: CHF 2’000 HT.',
  'Achats courants suisses: impôt préalable CHF 2’430, droit intégral à déduction.',
  'Machine: impôt préalable CHF 4’050, droit intégral à déduction.',
  'Cloud étranger: CHF 8’000 HT; prestataire non inscrit à la TVA suisse; conditions du cas remplies pour l’impôt sur les acquisitions; droit intégral à l’IP.',
  'Importation de marchandises: TVA à l’importation CHF 1’215, DTe valable et droit à déduction rempli.',
  'Subvention cantonale CHF 5’000 hors contre-prestation. Dans ce scénario, elle finance uniquement des charges sans TVA: aucune réduction supplémentaire de l’IP n’est à calculer.'
];

const FIELDS=[
  ['ch200','ch. 200 — Total des contre-prestations',77000],
  ['ch205','ch. 205 — Dont prestations imposées par option',12000],
  ['ch220','ch. 220 — Prestations exonérées',15000],
  ['ch221','ch. 221 — Prestations fournies à l’étranger',10000],
  ['ch235','ch. 235 — Diminutions de contre-prestation',2000],
  ['ch289','ch. 289 — Total des déductions',27000],
  ['ch299','ch. 299 — Chiffre d’affaires imposable',50000],
  ['ch303','ch. 303 — Base au taux normal',50000],
  ['ch379','ch. 379 — Total des bases imposables',50000],
  ['ch383base','ch. 383 — Base acquisitions',8000],
  ['ch383tax','ch. 383 — Impôt sur les acquisitions',648],
  ['ch399','ch. 399 — Total impôt dû',4698],
  ['ch400','ch. 400 — IP charges / marchandises',4293],
  ['ch405','ch. 405 — IP investissements',4050],
  ['ch479','ch. 479 — Total IP',8343],
  ['ch500','ch. 500 — Montant à payer',0],
  ['ch510','ch. 510 — Solde en faveur de l’assujetti',3645],
  ['ch900','ch. 900 — Subventions',5000]
];

const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>new Intl.NumberFormat('fr-CH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(v||0));
function parseAmount(value){const s=String(value??'').trim();if(!s)return null;const n=Number(s.replace(/CHF/gi,'').replace(/[’'\s\u00a0\u202f]/g,'').replace(',','.'));return Number.isFinite(n)?n:null}
function closeEnough(a,b){return Number.isFinite(a)&&Math.abs(a-b)<=0.011}
function load(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')||{fields:{},bestScore:0,attempts:0}}catch{return{fields:{},bestScore:0,attempts:0}}}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
let state=load();

function launcherMarkup(){
  const status=state.bestScore?`Meilleur score: ${state.bestScore} %${state.bestScore>=PASS_PERCENT?' · réussi':''}`:'Pas encore tenté';
  return `<section class="atelier-launcher" id="level1AtelierDeclaration"><div><p class="atelier-kicker">Exercice de synthèse · déclaration</p><h2>Remplir un décompte complet</h2><p>10 opérations résumées → 18 rubriques et totaux. Aucun audit de pièces ni grand livre: l’objectif est uniquement de construire correctement le décompte TVA.</p><span class="atelier-status">${esc(status)}</span></div><button class="btn primary" type="button" data-atelier-open="declaration">Ouvrir l’exercice</button></section>`;
}

function dialogMarkup(){
  return `<dialog class="atelier-dialog" id="level1AtelierDialog" aria-labelledby="level1AtelierTitle"><div class="atelier-shell"><header class="atelier-head"><div><p class="atelier-kicker">Niveau 1 · synthèse du formulaire</p><h2 id="level1AtelierTitle">Exercice — Décompte complet</h2><p>T2 2026 · méthode effective · contre-prestations convenues. Les hypothèses déterminantes sont déjà données: votre travail consiste à reporter correctement les montants.</p></div><button class="atelier-close" type="button" aria-label="Fermer" data-atelier-close>×</button></header><div class="atelier-body"><section class="atelier-brief"><strong>Opérations du trimestre</strong><ol>${OPERATIONS.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section><section><div class="atelier-section-head"><div><p class="atelier-kicker">Votre déclaration</p><h3>Compléter les rubriques</h3></div><span>${FIELDS.length} contrôles</span></div><div class="atelier-fields">${FIELDS.map(([key,label])=>`<label><span>${esc(label)}</span><input type="text" inputmode="decimal" data-atelier-field="${key}" value="${esc(state.fields?.[key]??'')}" placeholder="0.00"><small>CHF</small></label>`).join('')}</div></section><section class="atelier-actions"><button class="btn primary" type="button" data-atelier-check>Vérifier le décompte</button><button class="btn" type="button" data-atelier-reset>Réinitialiser</button><span>Réussite pédagogique dès ${PASS_PERCENT} %. Cet exercice ne modifie pas le compteur 18/18.</span></section><div class="atelier-result" id="level1AtelierResult" aria-live="polite"></div><section class="atelier-sources"><h3>Sources</h3>${SOURCES.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('')}</section></div></div></dialog>`;
}

function renderLauncher(){const old=document.querySelector('#level1AtelierDeclaration');if(old)old.outerHTML=launcherMarkup();else document.querySelector('#finalEvaluation')?.insertAdjacentHTML('beforebegin',launcherMarkup());bindLauncher()}
function ensureDialog(){if(!document.querySelector('#level1AtelierDialog'))document.body.insertAdjacentHTML('beforeend',dialogMarkup());bindDialog()}
function bindLauncher(){document.querySelector('[data-atelier-open="declaration"]')?.addEventListener('click',()=>{ensureDialog();const d=document.querySelector('#level1AtelierDialog');if(!d.open)d.showModal()})}
function bindDialog(){
  const d=document.querySelector('#level1AtelierDialog');if(!d||d.dataset.bound)return;d.dataset.bound='1';
  d.querySelector('[data-atelier-close]')?.addEventListener('click',()=>d.close());
  d.addEventListener('click',e=>{if(e.target===d)d.close()});
  d.addEventListener('input',e=>{const field=e.target.closest('[data-atelier-field]');if(field){state.fields[field.dataset.atelierField]=field.value;save()}});
  d.querySelector('[data-atelier-check]')?.addEventListener('click',checkAtelier);
  d.querySelector('[data-atelier-reset]')?.addEventListener('click',()=>{if(!confirm('Réinitialiser toutes les réponses de cet exercice?'))return;state={fields:{},bestScore:state.bestScore||0,attempts:state.attempts||0};save();d.outerHTML=dialogMarkup();ensureDialog();document.querySelector('#level1AtelierDialog').showModal()});
}

function checkAtelier(){
  let correct=0;const errors=[];
  for(const [key,label,expected] of FIELDS){
    const actual=parseAmount(state.fields?.[key]);const good=closeEnough(actual,expected);if(good)correct++;else errors.push(`<li><strong>${esc(label)}</strong> — attendu CHF ${fmt(expected)}${actual===null?' (champ vide)':' · saisi CHF '+fmt(actual)}</li>`);
    const input=document.querySelector(`[data-atelier-field="${key}"]`);if(input){input.classList.toggle('atelier-good',good);input.classList.toggle('atelier-bad',!good)}
  }
  const percent=Math.round(correct/FIELDS.length*100);state.attempts=(state.attempts||0)+1;state.bestScore=Math.max(state.bestScore||0,percent);save();
  const ok=percent>=PASS_PERCENT;
  document.querySelector('#level1AtelierResult').innerHTML=`<div class="atelier-result-head"><strong>${percent} %</strong><div><h3>${ok?'Décompte cohérent':'Décompte à corriger'}</h3><p>${correct}/${FIELDS.length} rubriques ou totaux corrects.</p></div></div>${errors.length?`<details ${ok?'':'open'}><summary>Voir les corrections (${errors.length})</summary><ul>${errors.join('')}</ul></details>`:'<p><strong>Réconciliation:</strong> ch. 299 = ch. 379 = CHF 50’000.00 · ch. 399 = CHF 4’698.00 · ch. 479 = CHF 8’343.00 · ch. 510 = CHF 3’645.00.</p>'}`;
  renderLauncher();
}

renderLauncher();
