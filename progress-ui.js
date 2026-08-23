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
  strong.textContent=`${n} / ${TOTAL} maîtrisés`;
  const status=strong.closest('.status');
  if(status){
    const text=[...status.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim());
    if(text)text.textContent='Cas maîtrisés';
  }
}
function patchPracticeLabels(){
  const progress=document.querySelector('#sidebar .progress');
  if(!progress)return;
  const text=[...progress.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);
  if(text)text.textContent='Repère de pratique: ';
}
function removeOldPathCounters(){
  document.querySelector('#effectivePathProgress')?.remove();
}
function labelCasePosition(){
  const count=document.querySelector('#uxCaseCount');
  const select=document.querySelector('#caseSelect');
  if(!count||!select)return;
  count.textContent=`Cas ${select.selectedIndex+1} / ${select.options.length}`;
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
  return readState().drafts?.[id]?.evaluate||null;
}
function failedEvaluationState(){
  const draft=currentEvaluationDraft();
  const evaluationActive=document.querySelector('[data-mode="evaluate"].active');
  if(!evaluationActive||!draft?.submitted||!Number.isFinite(Number(draft.lastScore))||Number(draft.lastScore)>=100)return null;
  return {draft,correctionSeen:Boolean(draft.correctionShown)};
}
function reopenCurrentEvaluationAttempt(){
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
function copyAttemptToPractice(){
  const id=currentCaseId();
  if(!id)return;
  const state=readState();
  const source=state.drafts?.[id]?.evaluate;
  if(!source)return;
  if(!state.drafts)state.drafts={};
  if(!state.drafts[id])state.drafts[id]={};
  state.drafts[id].practice={
    values:{...(source.values||{})},
    qualification:source.qualification??'',
    assisted:true,
    submitted:false,
    correctionShown:false,
    lastScore:null
  };
  state.mode='practice';
  writeState(state);
  location.reload();
}
function syncRetryControls(){
  document.querySelector('#uxRetryCurrent')?.remove();
  const reset=document.querySelector('#sidebar [data-reset]');
  if(!reset)return;

  const failed=failedEvaluationState();
  if(!failed)return;

  reset.textContent='Nouvelle évaluation';
  const retry=document.createElement('button');
  retry.type='button';
  retry.id='uxRetryCurrent';
  retry.className='btn';
  retry.textContent=failed.correctionSeen?'Corriger ma tentative (entraînement)':'Corriger ma tentative';
  retry.title=failed.correctionSeen
    ?'Le corrigé a déjà été consulté : reprendre vos réponses en mode Entraînement, sans valider le cas en Évaluation.'
    :'Conserver vos réponses et déverrouiller ce cas pour les corriger. Vous pourrez recommencer autant de fois que nécessaire.';
  retry.addEventListener('click',()=>failed.correctionSeen?copyAttemptToPractice():reopenCurrentEvaluationAttempt());
  reset.insertAdjacentElement('beforebegin',retry);
}
function syncUi(forced){
  removeOldPathCounters();
  renderHeaderProgress(forced);
  patchPracticeLabels();
  labelCasePosition();
  syncRetryControls();
}

window.addEventListener('effective-progress',e=>{
  setTimeout(()=>syncUi(e.detail?.mastered),0);
});
window.addEventListener('storage',e=>{
  if(e.key===STORAGE_KEY)setTimeout(()=>syncUi(),0);
});

document.addEventListener('change',e=>{
  if(e.target?.id==='caseSelect'){
    clearStaleResult();
    setTimeout(()=>syncUi(),0);
  }
});

document.addEventListener('click',e=>{
  if(e.target.closest?.('[data-prev],[data-next],#uxPrevCase,#uxNextCase,[data-case]')){
    clearStaleResult();
  }
  if(e.target.closest?.('[data-prev],[data-next],#uxPrevCase,#uxNextCase,[data-case],[data-mode],[data-verify],[data-correction],[data-reset]')){
    setTimeout(()=>syncUi(),0);
  }
});

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>syncUi(),0),{once:true});
}else{
  setTimeout(()=>syncUi(),0);
}
