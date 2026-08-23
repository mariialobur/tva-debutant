const STORAGE_KEY='tva_effective_v2_state';
const TOTAL=18;

function readState(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}
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
function ensureRetryButton(){
  const feedback=document.querySelector('#qualification .qual-feedback.bad');
  const select=document.querySelector('#qualificationSelect');
  const evaluationActive=document.querySelector('[data-mode="evaluate"].active');
  if(!feedback||!select?.disabled||!evaluationActive){
    document.querySelector('#uxRetryEvaluation')?.remove();
    return;
  }
  if(document.querySelector('#uxRetryEvaluation'))return;
  const wrap=document.createElement('div');
  wrap.id='uxRetryEvaluation';
  wrap.style.marginTop='10px';
  wrap.innerHTML='<button type="button" class="btn" style="min-height:40px">Nouvelle tentative</button><small style="display:block;margin-top:6px;color:#5f6d72">La tentative remise reste enregistrée; cette action rouvre le même cas pour un nouvel essai.</small>';
  wrap.querySelector('button').addEventListener('click',()=>{
    const reset=document.querySelector('#sidebar [data-reset]');
    reset?.click();
  });
  feedback.insertAdjacentElement('afterend',wrap);
}
function renderAll(){
  removeOldPathCounters();
  renderHeaderProgress();
  labelCasePosition();
  ensureRetryButton();
}

window.addEventListener('effective-progress',e=>{
  removeOldPathCounters();
  renderHeaderProgress(e.detail?.mastered);
  setTimeout(()=>{labelCasePosition();ensureRetryButton()},0);
});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)renderAll()});
document.addEventListener('change',e=>{
  if(e.target?.id==='caseSelect'){
    clearStaleResult();
    setTimeout(()=>{labelCasePosition();ensureRetryButton()},0);
  }
});
document.addEventListener('click',e=>{
  if(e.target.closest?.('[data-prev],[data-next],#uxPrevCase,#uxNextCase,[data-case]')){
    clearStaleResult();
    setTimeout(()=>{labelCasePosition();ensureRetryButton()},0);
  }
  if(e.target.closest?.('[data-mode],[data-verify],[data-correction],[data-reset]')){
    setTimeout(ensureRetryButton,0);
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  const bodyObserver=new MutationObserver(()=>{
    removeOldPathCounters();
    labelCasePosition();
    ensureRetryButton();
  });
  bodyObserver.observe(document.body,{childList:true,subtree:true});
});
