// Fiscal guard for the Level 1 mini-ledger atelier.
// The subsidy in line L6 must not teach the shortcut "subsidy = ch. 900 only".
function injectSubsidyGuard(){
  const dialog=document.querySelector('#level1AtelierDialog');
  if(!dialog||dialog.querySelector('[data-atelier-subsidy-guard]'))return;
  const brief=dialog.querySelector('.atelier-brief');
  if(!brief)return;
  const note=document.createElement('div');
  note.className='atelier-brief';
  note.dataset.atelierSubsidyGuard='1';
  note.innerHTML='<strong>Hypothèse spécifique — subvention L6</strong><p>La décision qualifie CHF 5’000 de subvention. Le dossier de financement précise que ces fonds couvrent exclusivement des charges sans TVA et qu’aucun impôt préalable n’est attribuable à ces fonds dans ce scénario: la réduction ch. 420 est donc nulle ici. Dans un dossier réel, l’effet de la subvention sur l’impôt préalable doit toujours être analysé séparément.</p>';
  brief.insertAdjacentElement('afterend',note);
}

document.addEventListener('click',event=>{
  if(event.target.closest('[data-atelier-open="ledger"]'))setTimeout(injectSubsidyGuard,0);
},true);
