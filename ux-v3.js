import { CASES } from './data.js';

const $=s=>document.querySelector(s);
const LEVEL_PLAN_STORAGE='tva_effective_v2_state';
const LEVEL_PLAN_GROUPS=[
  {title:'Bases du décompte',ids:['A','B','C','D']},
  {title:'Exclusions, international & financement',ids:['E','F','G','H']},
  {title:'Opérations particulières & impôt préalable',ids:['I','J','K','L']},
  {title:'Périodes, importation & devises',ids:['M','N','O']},
  {title:'Contrôle & finalisation',ids:['P','Q','R']}
];
let planReturnFocus=null;

function loadStyles(){
  if(document.querySelector('link[data-ux-v3]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='ux-v3.css?v=3.5.0';link.dataset.uxV3='true';
  document.head.appendChild(link);
}

function placePathProgress(){
  const bar=$('#effectivePathProgress'),status=$('.top .status');
  if(!bar||!status)return false;
  if(bar.parentElement!==status)status.appendChild(bar);
  return true;
}

function compactChrome(){
  const disclaimer=$('.disclaimer');
  if(disclaimer)disclaimer.innerHTML='<strong>Projet pédagogique indépendant.</strong> Non affilié à l’AFC · remise officielle via le Portail AFC · sources principales contrôlées le 17.08.2026.';
  if(placePathProgress())return;
  const observer=new MutationObserver((_,obs)=>{if(placePathProgress())obs.disconnect()});
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),5000);
}

function patchIdentity(){
  const mark=$('.brand .flag, .brand .brandmark');
  if(mark){mark.className='brandmark';mark.textContent='TVA'}
  const h=$('.brand h1'),p=$('.brand p');
  if(h)h.textContent='TVA suisse — méthode effective';
  if(p)p.textContent='Niveau 1 · Fondamentaux · qualifier → reporter → contrôler → interpréter';
}

function patchControls(){
  const blocks=[...document.querySelectorAll('.controls>div')];
  if(blocks[0]?.querySelector(':scope>strong'))blocks[0].querySelector(':scope>strong').textContent='Mode';
  if(blocks[1]?.querySelector(':scope>strong'))blocks[1].querySelector(':scope>strong').textContent='Affichage';
  const guided=$('[data-view="guided"]'),extended=$('[data-view="extended"]');
  if(guided){guided.textContent='Rubriques utiles';guided.title='Afficher uniquement les rubriques utiles au cas'}
  if(extended){extended.textContent='Formulaire étendu';extended.title='Afficher toutes les rubriques pédagogiques'}
  const modeHelp={learn:'Aides visibles',practice:'Aides après tentative',evaluate:'Sans aide'};
  blocks[0]?.querySelector('.ux-mode-hint')?.remove();
  if(blocks[0]){
    const hint=document.createElement('span');hint.className='ux-mode-hint';
    const active=blocks[0].querySelector('[data-mode].active')?.dataset.mode||'learn';
    hint.textContent=modeHelp[active]||'';blocks[0].appendChild(hint);
  }
}

function patchAccessibleNames(){
  const qualification=$('#qualificationSelect');
  if(qualification&&!qualification.getAttribute('aria-label'))qualification.setAttribute('aria-label','Qualification TVA — choisir une réponse');
}
function observeQualification(){
  const host=$('#qualification');if(!host||host.dataset.uxObserved)return;
  host.dataset.uxObserved='1';
  new MutationObserver(()=>requestAnimationFrame(patchAccessibleNames)).observe(host,{childList:true,subtree:true});
  patchAccessibleNames();
}

function changeCase(delta){
  const select=$('#caseSelect');if(!select)return;
  const i=Math.max(0,Math.min(select.options.length-1,select.selectedIndex+delta));
  if(i===select.selectedIndex)return;
  select.selectedIndex=i;select.dispatchEvent(new Event('change',{bubbles:true}));
}
function syncStepper(){
  const select=$('#caseSelect'),prev=$('#uxPrevCase'),next=$('#uxNextCase'),count=$('#uxCaseCount');if(!select)return;
  if(prev)prev.disabled=select.selectedIndex<=0;if(next)next.disabled=select.selectedIndex>=select.options.length-1;if(count)count.textContent=`${select.selectedIndex+1} / ${select.options.length}`;
}

function safePlanState(){
  try{return JSON.parse(localStorage.getItem(LEVEL_PLAN_STORAGE)||'{}')}catch{return{}}
}
function planStatus(id,state){
  const r=state.records?.[id]||{},d=state.drafts?.[id]||{};
  if(Number(r.bestEvaluationScore)===100)return{key:'mastered',label:'Maîtrisé ✓'};
  const attempts=['learningAttempts','practiceAttempts','evaluationAttempts'].some(k=>Number(r[k])>0);
  const scores=['bestLearningScore','bestPracticeScore','bestEvaluationScore'].some(k=>Number(r[k])>0);
  const values=Object.values(d.values||{}).some(v=>String(v??'').trim()!=='');
  if(attempts||scores||values||d.qualification||d.submitted)return{key:'progress',label:'En cours'};
  return{key:'todo',label:'À faire'};
}
function ensureLevelPlan(){
  if($('#uxLevelPlanLayer'))return;
  const layer=document.createElement('div');layer.id='uxLevelPlanLayer';layer.className='ux-plan-layer';layer.hidden=true;
  layer.innerHTML=`<div class="ux-plan-backdrop" data-plan-close></div><section class="ux-plan-dialog" role="dialog" aria-modal="true" aria-labelledby="uxLevelPlanTitle" tabindex="-1"><header class="ux-plan-head"><div><span class="ux-plan-eyebrow">Méthode effective · Niveau 1</span><h2 id="uxLevelPlanTitle">Plan du niveau</h2><p id="uxLevelPlanSummary"></p></div><button type="button" class="ux-plan-close" data-plan-close aria-label="Fermer le plan du niveau">×</button></header><div class="ux-plan-body" id="uxLevelPlanBody"></div><footer class="ux-plan-foot"><button type="button" class="btn" id="uxPlanFinal">Évaluation finale</button><button type="button" class="btn" data-plan-close>Fermer</button></footer></section>`;
  document.body.appendChild(layer);
  layer.addEventListener('click',e=>{
    if(e.target.matches('[data-plan-close]'))closeLevelPlan();
    const card=e.target.closest('[data-plan-case-index]');
    if(card){
      const select=$('#caseSelect'),index=Number(card.dataset.planCaseIndex);
      if(select&&Number.isInteger(index)){select.selectedIndex=index;select.dispatchEvent(new Event('change',{bubbles:true}))}
      closeLevelPlan();
      setTimeout(()=>$('#uxWorkbar')?.scrollIntoView({block:'start'}),0);
    }
  });
  $('#uxPlanFinal')?.addEventListener('click',()=>{
    closeLevelPlan();
    setTimeout(()=>{const target=$('#finalEvaluation');target?.scrollIntoView({behavior:'smooth',block:'start'});$('#startFinal')?.focus({preventScroll:true})},0);
  });
  layer.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();closeLevelPlan();return}
    if(e.key!=='Tab')return;
    const dialog=layer.querySelector('.ux-plan-dialog');
    const focusables=[...dialog.querySelectorAll('button:not([disabled]),a[href],select,input,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hidden&&el.offsetParent!==null);
    if(!focusables.length)return;
    const first=focusables[0],last=focusables[focusables.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
}
function renderLevelPlan(){
  ensureLevelPlan();
  const state=safePlanState(),body=$('#uxLevelPlanBody'),summary=$('#uxLevelPlanSummary'),select=$('#caseSelect');if(!body)return;
  const statuses=Object.fromEntries(CASES.map(c=>[c.id,planStatus(c.id,state)]));
  const mastered=CASES.filter(c=>statuses[c.id].key==='mastered').length;
  if(summary)summary.textContent=`${mastered}/18 maîtrisés · choisissez un cas pour reprendre directement.`;
  body.innerHTML=LEVEL_PLAN_GROUPS.map(group=>{
    const cases=group.ids.map(id=>CASES.find(c=>c.id===id)).filter(Boolean);
    const done=cases.filter(c=>statuses[c.id].key==='mastered').length;
    return `<section class="ux-plan-group"><div class="ux-plan-group-head"><h3>${group.title}</h3><span>${done}/${cases.length}</span></div><div class="ux-plan-grid">${cases.map(c=>{const i=CASES.indexOf(c),s=statuses[c.id],current=select?.selectedIndex===i;return `<button type="button" class="ux-plan-card is-${s.key}${current?' is-current':''}" data-plan-case-index="${i}"${current?' aria-current="true"':''}><span class="ux-plan-card-main"><strong>${c.id}</strong><span>${c.tab||c.title}</span></span><span class="ux-plan-status">${s.label}</span></button>`}).join('')}</div></section>`;
  }).join('');
}
function openLevelPlan(){
  ensureLevelPlan();renderLevelPlan();
  const layer=$('#uxLevelPlanLayer');if(!layer)return;
  planReturnFocus=document.activeElement;layer.hidden=false;document.body.classList.add('ux-plan-opened');
  layer.querySelector('.ux-plan-close')?.focus();
}
function closeLevelPlan(){
  const layer=$('#uxLevelPlanLayer');if(!layer||layer.hidden)return;
  layer.hidden=true;document.body.classList.remove('ux-plan-opened');
  if(planReturnFocus&&document.contains(planReturnFocus))planReturnFocus.focus();
}

function enhanceSources(){
  const s=$('.sources');if(!s||s.dataset.uxReady)return;s.dataset.uxReady='1';s.classList.add('ux-sources','ux-collapsed');
  const btn=document.createElement('button');btn.type='button';btn.className='btn ux-sources-toggle';btn.textContent='Voir toutes les sources';btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',()=>{const collapsed=s.classList.toggle('ux-collapsed');btn.textContent=collapsed?'Voir toutes les sources':'Réduire les sources';btn.setAttribute('aria-expanded',String(!collapsed))});s.appendChild(btn);
}
function enhanceSidebar(){
  const sidebar=$('#sidebar');if(!sidebar)return;
  if(!sidebar.querySelector('.ux-sidebar-toggle')){const task=sidebar.querySelector('.task');const btn=document.createElement('button');btn.type='button';btn.className='btn ux-sidebar-toggle';btn.textContent='Afficher sources et contrôles';btn.setAttribute('aria-expanded','false');btn.addEventListener('click',()=>{const open=sidebar.classList.toggle('ux-details-open');btn.textContent=open?'Masquer sources et contrôles':'Afficher sources et contrôles';btn.setAttribute('aria-expanded',String(open))});task?.insertAdjacentElement('afterend',btn)}
  syncMobileVerify();
}
function ensureMobileVerify(){if($('#uxMobileVerify'))return;const btn=document.createElement('button');btn.type='button';btn.id='uxMobileVerify';btn.className='ux-mobile-verify';btn.textContent='Vérifier mes réponses';btn.addEventListener('click',()=>$('#sidebar [data-verify]')?.click());document.body.appendChild(btn)}
function syncMobileVerify(){ensureMobileVerify();const copy=$('#uxMobileVerify'),original=$('#sidebar [data-verify]');if(!copy)return;if(!original){copy.hidden=true;copy.classList.remove('is-visible');return}copy.hidden=false;copy.disabled=original.disabled;copy.textContent=original.textContent||'Vérifier mes réponses';const passed=window.innerWidth<=700&&original.getBoundingClientRect().bottom<0;copy.classList.toggle('is-visible',passed)}
function observeSidebar(){const sidebar=$('#sidebar');if(!sidebar||sidebar.dataset.uxObserved)return;sidebar.dataset.uxObserved='1';new MutationObserver(()=>requestAnimationFrame(enhanceSidebar)).observe(sidebar,{childList:true});enhanceSidebar()}

function buildWorkbar(){
  if($('#uxWorkbar'))return;patchIdentity();compactChrome();patchControls();enhanceSources();
  const caseWrap=$('.case-select-wrap'),controls=$('.controls'),learnbar=$('.learnbar');if(!caseWrap||!controls||!learnbar)return;
  const bar=document.createElement('section');bar.id='uxWorkbar';bar.className='ux-workbar';bar.setAttribute('aria-label','Navigation et réglages du cas');
  const stepper=document.createElement('div');stepper.className='ux-stepper';stepper.innerHTML='<button type="button" class="ux-step" id="uxPrevCase" aria-label="Cas précédent">←</button><span class="ux-count" id="uxCaseCount"></span><button type="button" class="ux-plan-open" id="uxLevelPlanOpen" aria-haspopup="dialog">Plan</button><button type="button" class="ux-step" id="uxNextCase" aria-label="Cas suivant">→</button>';
  const nav=document.createElement('div');nav.className='ux-case-nav';nav.append(stepper,caseWrap);bar.append(nav,controls);learnbar.insertAdjacentElement('afterend',bar);
  $('#uxPrevCase').addEventListener('click',()=>changeCase(-1));$('#uxNextCase').addEventListener('click',()=>changeCase(1));$('#uxLevelPlanOpen').addEventListener('click',openLevelPlan);$('#caseSelect').addEventListener('change',()=>setTimeout(()=>{syncStepper();syncMobileVerify()},0));
  document.addEventListener('click',e=>{
    const resultNext=e.target.closest?.('#result [data-next]');
    if(resultNext){e.preventDefault();changeCase(1);return}
    const resultCorrection=e.target.closest?.('#result [data-correction]');
    if(resultCorrection){e.preventDefault();$('#sidebar [data-correction]')?.click();return}
    if(e.target.closest?.('[data-prev],[data-next]'))setTimeout(()=>{syncStepper();syncMobileVerify()},0);
    if(e.target.closest?.('[data-mode]'))setTimeout(()=>{patchControls();syncMobileVerify();patchAccessibleNames()},0)
  });
  window.addEventListener('scroll',syncMobileVerify,{passive:true});window.addEventListener('resize',syncMobileVerify,{passive:true});window.addEventListener('storage',e=>{if(e.key===LEVEL_PLAN_STORAGE&&!$('#uxLevelPlanLayer')?.hidden)renderLevelPlan()});
  syncStepper();observeSidebar();observeQualification();ensureMobileVerify();ensureLevelPlan();syncMobileVerify();document.body.classList.add('ux-v3');
}

loadStyles();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',buildWorkbar);else buildWorkbar();
