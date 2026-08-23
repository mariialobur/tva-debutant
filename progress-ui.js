const STORAGE_KEY='tva_effective_v2_state';
const TOTAL=18;
const CASE_IDS='ABCDEFGHIJKLMNOPQR'.split('');

function readState(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}
}
function writeState(state){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}
}
function validatedCount(){
  const records=readState().records||{};
  return Object.values(records).filter(r=>Number(r?.bestEvaluationScore)===100).length;
}
function renderHeaderProgress(forced){
  const strong=document.querySelector('#globalProgress');
  if(!strong)return;
  const n=Number.isFinite(Number(forced))?Number(forced):validatedCount();
  strong.textContent=`${n} / ${TOTAL} validés`;
  const status=strong.closest('.status');
  if(status){
    const text=[...status.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
    if(text)text.textContent='Progression Niveau 1';
  }
}
function removeOldPathCounters(){
  document.querySelector('#effectivePathProgress')?.remove();
}
function labelCasePosition(){
  const count=document.querySelector('#uxCaseCount');
  const select=document.querySelector('#caseSelect');
  if(!count||!select)return;
  const wanted=`Cas ${select.selectedIndex+1} / ${select.options.length}`;
  if(count.textContent!==wanted)count.textContent=wanted;
}
function clearStaleResult(){
  const result=document.querySelector('#result');
  if(result)result.innerHTML='';
}
function currentCaseId(){
  const select=document.querySelector('#caseSelect');
  const i=select?.selectedIndex;
  return Number.isInteger(i)&&i>=0?CASE_IDS[i]:null;
}
function currentEvaluationDraft(){
  const id=currentCaseId();
  if(!id)return null;
  const state=readState();
  return state.drafts?.[id]?.evaluate||null;
}
function reopenCurrentAttempt(){
  const id=currentCaseId();
  if(!id)return;
  const state=readState();
  const draft=state.drafts?.[id]?.evaluate;
  if(!draft)return;
  draft.submitted=false;
  draft.correctionShown=false;
  draft.lastScore=null;
  state.mode='evaluate';
  writeState(state);
  location.reload();
}
function startFreshEvaluation(){
  const id=currentCaseId();
  if(!id)return;
  const state=readState();
  if(state.drafts?.[id]){
    delete state.drafts[id].evaluate;
    if(!Object.keys(state.drafts[id]).length)delete state.drafts[id];
  }
  state.mode='evaluate';
  writeState(state);
  location.reload();
}
function ensureResultRetry(){
  document.querySelector('#uxResultRetry')?.remove();
  const evaluationActive=document.querySelector('[data-mode="evaluate"].active');
  const result=document.querySelector('#result .result');
  if(!evaluationActive||!result)return;
  const title=result.querySelector('h2')?.textContent||'';
  if(!title.includes('cas non validé'))return;
  const actions=result.querySelector('.result-actions');
  if(!actions)return;
  const draft=currentEvaluationDraft();
  if(!draft?.submitted)return;
  const correctionSeen=Boolean(draft.correctionShown);
  const wrap=document.createElement('div');
  wrap.id='uxResultRetry';
  wrap.style.display='flex';
  wrap.style.flexDirection='column';
  wrap.style.alignItems='flex-start';
  wrap.style.gap='6px';
  wrap.style.marginRight='auto';
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='btn';
  btn.textContent=correctionSeen?'Nouvelle évaluation':'Corriger ma tentative';
  const note=document.createElement('small');
  note.style.color='#5f6d72';
  note.style.maxWidth='540px';
  note.textContent=correctionSeen
    ?'Le corrigé a été consulté : la nouvelle tentative repart sans réponses préremplies.'
    :'Vos réponses restent en place et sont déverrouillées pour corriger cette tentative.';
  btn.addEventListener('click',()=>correctionSeen?startFreshEvaluation():reopenCurrentAttempt());
  wrap.append(btn,note);
  actions.prepend(wrap);
}
function renderAll(){
  removeOldPathCounters();
  renderHeaderProgress();
  labelCasePosition();
  ensureResultRetry();
}

window.addEventListener('effective-progress',e=>{
  removeOldPathCounters();
  renderHeaderProgress(e.detail?.mastered);
  setTimeout(()=>{labelCasePosition();ensureResultRetry()},0);
});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)renderAll()});
document.addEventListener('change',e=>{
  if(e.target?.id==='caseSelect'){
    clearStaleResult();
    setTimeout(()=>{labelCasePosition();ensureResultRetry()},0);
  }
});
document.addEventListener('click',e=>{
  if(e.target.closest?.('[data-prev],[data-next],#uxPrevCase,#uxNextCase,[data-case]')){
    clearStaleResult();
    setTimeout(()=>{labelCasePosition();ensureResultRetry()},0);
  }
  if(e.target.closest?.('[data-mode],[data-verify],[data-correction],[data-reset]')){
    setTimeout(ensureResultRetry,0);
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  const bodyObserver=new MutationObserver(()=>{
    removeOldPathCounters();
    labelCasePosition();
    ensureResultRetry();
  });
  bodyObserver.observe(document.body,{childList:true,subtree:true});
});
