const $=s=>document.querySelector(s);

function loadStyles(){
  if(document.querySelector('link[data-ux-v3]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='ux-v3.css?v=3.2.1';link.dataset.uxV3='true';
  document.head.appendChild(link);
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

function enhanceSources(){
  const s=$('.sources');if(!s||s.dataset.uxReady)return;
  s.dataset.uxReady='1';s.classList.add('ux-sources','ux-collapsed');
  const btn=document.createElement('button');btn.type='button';btn.className='btn ux-sources-toggle';btn.textContent='Voir toutes les sources';btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click',()=>{const collapsed=s.classList.toggle('ux-collapsed');btn.textContent=collapsed?'Voir toutes les sources':'Réduire les sources';btn.setAttribute('aria-expanded',String(!collapsed))});
  s.appendChild(btn);
}

function enhanceSidebar(){
  const sidebar=$('#sidebar');if(!sidebar)return;
  if(!sidebar.querySelector('.ux-sidebar-toggle')){
    const task=sidebar.querySelector('.task');
    const btn=document.createElement('button');btn.type='button';btn.className='btn ux-sidebar-toggle';btn.textContent='Afficher sources et contrôles';btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',()=>{const open=sidebar.classList.toggle('ux-details-open');btn.textContent=open?'Masquer sources et contrôles':'Afficher sources et contrôles';btn.setAttribute('aria-expanded',String(open))});
    task?.insertAdjacentElement('afterend',btn);
  }
  syncMobileVerify();
}

function ensureMobileVerify(){
  if($('#uxMobileVerify'))return;
  const btn=document.createElement('button');btn.type='button';btn.id='uxMobileVerify';btn.className='ux-mobile-verify';btn.textContent='Vérifier mes réponses';
  btn.addEventListener('click',()=>$('#sidebar [data-verify]')?.click());
  document.body.appendChild(btn);
}
function syncMobileVerify(){
  ensureMobileVerify();const copy=$('#uxMobileVerify'),original=$('#sidebar [data-verify]');
  if(!copy)return;
  if(!original){copy.hidden=true;return}
  copy.hidden=false;copy.disabled=original.disabled;copy.textContent=original.textContent||'Vérifier mes réponses';
}

function observeSidebar(){
  const sidebar=$('#sidebar');if(!sidebar||sidebar.dataset.uxObserved)return;
  sidebar.dataset.uxObserved='1';
  new MutationObserver(()=>requestAnimationFrame(enhanceSidebar)).observe(sidebar,{childList:true});
  enhanceSidebar();
}

function buildWorkbar(){
  if($('#uxWorkbar'))return;
  patchIdentity();patchControls();enhanceSources();
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
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-prev],[data-next]'))setTimeout(syncStepper,0);if(e.target.closest?.('[data-mode]'))setTimeout(()=>{patchControls();syncMobileVerify();patchAccessibleNames()},0)});
  syncStepper();observeSidebar();observeQualification();ensureMobileVerify();syncMobileVerify();
  document.body.classList.add('ux-v3');
}

loadStyles();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',buildWorkbar);else buildWorkbar();
