const $=s=>document.querySelector(s);

function loadStyles(){
  if(document.querySelector('link[data-ux-v3]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='ux-v3.css?v=3.1.0';link.dataset.uxV3='true';
  document.head.appendChild(link);
}

function changeCase(delta){
  const select=$('#caseSelect');
  if(!select)return;
  const i=Math.max(0,Math.min(select.options.length-1,select.selectedIndex+delta));
  if(i===select.selectedIndex)return;
  select.selectedIndex=i;
  select.dispatchEvent(new Event('change',{bubbles:true}));
}

function syncStepper(){
  const select=$('#caseSelect'),prev=$('#uxPrevCase'),next=$('#uxNextCase'),count=$('#uxCaseCount');
  if(!select)return;
  if(prev)prev.disabled=select.selectedIndex<=0;
  if(next)next.disabled=select.selectedIndex>=select.options.length-1;
  if(count)count.textContent=`${select.selectedIndex+1} / ${select.options.length}`;
}

function buildWorkbar(){
  if($('#uxWorkbar'))return;
  const caseWrap=$('.case-select-wrap'),controls=$('.controls'),learnbar=$('.learnbar');
  if(!caseWrap||!controls||!learnbar)return;
  const bar=document.createElement('section');
  bar.id='uxWorkbar';bar.className='ux-workbar';bar.setAttribute('aria-label','Navigation et réglages du cas');
  const stepper=document.createElement('div');stepper.className='ux-stepper';
  stepper.innerHTML='<button type="button" class="ux-step" id="uxPrevCase" aria-label="Cas précédent">←</button><span class="ux-count" id="uxCaseCount"></span><button type="button" class="ux-step" id="uxNextCase" aria-label="Cas suivant">→</button>';
  const nav=document.createElement('div');nav.className='ux-case-nav';nav.append(stepper,caseWrap);
  bar.append(nav,controls);
  learnbar.insertAdjacentElement('afterend',bar);
  $('#uxPrevCase').addEventListener('click',()=>changeCase(-1));
  $('#uxNextCase').addEventListener('click',()=>changeCase(1));
  $('#caseSelect').addEventListener('change',()=>setTimeout(syncStepper,0));
  syncStepper();
  document.body.classList.add('ux-v3');
}

loadStyles();
document.addEventListener('DOMContentLoaded',buildWorkbar);
