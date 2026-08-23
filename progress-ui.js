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
function renderAll(){
  removeOldPathCounters();
  renderHeaderProgress();
  labelCasePosition();
}

window.addEventListener('effective-progress',e=>{
  removeOldPathCounters();
  renderHeaderProgress(e.detail?.mastered);
  setTimeout(labelCasePosition,0);
});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)renderAll()});
document.addEventListener('change',e=>{if(e.target?.id==='caseSelect')setTimeout(labelCasePosition,0)});
document.addEventListener('click',e=>{if(e.target.closest?.('[data-prev],[data-next],#uxPrevCase,#uxNextCase,[data-case]'))setTimeout(labelCasePosition,0)});

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  const bodyObserver=new MutationObserver(()=>{
    removeOldPathCounters();
    labelCasePosition();
  });
  bodyObserver.observe(document.body,{childList:true,subtree:true});
});
