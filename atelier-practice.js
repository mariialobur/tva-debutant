// TVA suisse — méthode effective · Niveau 1
// Atelier autonome: mini-grand-livre -> décompte

const STORAGE_KEY='tva_effective_atelier_ledger_v1';
const PASS_PERCENT=85;

const SOURCES={
  form:['Prototype AFC — méthode effective','https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-effektiv-fr.pdf'],
  acquisitions:['AFC — impôt sur les acquisitions','https://www.estv.admin.ch/fr/impot-sur-les-acquisitions-tva'],
  dte:['AFC — décisions de taxation électroniques (DTe)','https://www.estv.admin.ch/fr/decisions-de-taxation-electroniques-de-la-douane'],
  control:['AFC — déroulement d’un contrôle TVA','https://www.estv.admin.ch/fr/deroulement-dun-controle-tva'],
  law:['LTVA — Fedlex','https://www.fedlex.admin.ch/eli/cc/2009/615/fr']
};

const TREATMENTS=[
  ['','— Choisir le traitement —'],
  ['std','CA suisse imposable 8,1 % → ch. 200 + base ch. 303'],
  ['export','Exportation documentée → ch. 200 + déduction ch. 220'],
  ['abroad','Prestation fournie à l’étranger → ch. 200 + déduction ch. 221'],
  ['option','Location commerciale avec option → ch. 200 + ch. 205 + base ch. 303'],
  ['credit','Diminution de contre-prestation → ch. 235 + réduction de la base imposable'],
  ['subsidy','Subvention hors contre-prestation → ch. 900'],
  ['donation','Don sans contre-prestation → ch. 910'],
  ['ip400','Impôt préalable sur charges / marchandises → ch. 400'],
  ['ip405','Impôt préalable sur investissements / autres charges → ch. 405'],
  ['acq','Service étranger visé → ch. 383 + IP ch. 400 si droit intégral'],
  ['dte','TVA à l’importation avec DTe → IP ch. 400 si conditions remplies']
];

const LEDGER=[
  {id:'L1',date:'03.04',label:'Facture client CH — prestations de conseil',amount:'CHF 40’000 HT',expected:'std',why:'Contre-prestation suisse imposable au taux normal dans le scénario.'},
  {id:'L2',date:'11.04',label:'Exportation de matériel vers la France — preuve d’exportation disponible',amount:'CHF 15’000 HT',expected:'export',why:'L’exportation documentée reste dans le total des contre-prestations puis est déduite au ch. 220.'},
  {id:'L3',date:'22.04',label:'Conseil B2B à une société française — lieu de la prestation en France selon les faits',amount:'CHF 10’000 HT',expected:'abroad',why:'La prestation est comprise dans le total puis déduite comme prestation fournie à l’étranger au ch. 221.'},
  {id:'L4',date:'02.05',label:'Loyer commercial — option valablement exercée; locataire n’utilise pas les locaux exclusivement comme habitation',amount:'CHF 12’000 HT',expected:'option',why:'Le ch. 205 est une information déjà comprise dans le ch. 200; la base imposable reste au taux normal.'},
  {id:'L5',date:'09.05',label:'Avoir sur une vente suisse imposable déjà comprise dans le chiffre d’affaires',amount:'CHF 2’000 HT',expected:'credit',why:'La diminution de contre-prestation est portée au ch. 235 et réduit aussi la base imposable correspondante.'},
  {id:'L6',date:'15.05',label:'Décision cantonale: montant expressément désigné comme subvention, sans contre-prestation individualisable',amount:'CHF 5’000',expected:'subsidy',why:'Dans le scénario, le financement public est qualifié de subvention et n’est pas ajouté au ch. 200; il est déclaré au ch. 900.'},
  {id:'L7',date:'19.05',label:'Don privé sans contre-prestation',amount:'CHF 2’000',expected:'donation',why:'Le don sans contre-prestation relève du ch. 910 dans le prototype utilisé par le parcours.'},
  {id:'L8',date:'27.05',label:'Achats de fournitures suisses — droit intégral à déduction',amount:'TVA CHF 2’430',expected:'ip400',why:'Impôt préalable sur charges / marchandises, classé au ch. 400 dans ce dossier.'},
  {id:'L9',date:'04.06',label:'Machine de production — droit intégral à déduction',amount:'TVA CHF 4’050',expected:'ip405',why:'Impôt préalable sur investissement, classé au ch. 405 dans le scénario.'},
  {id:'L10',date:'12.06',label:'Cloud étranger — prestataire non inscrit au registre TVA suisse; service au lieu du destinataire; usage professionnel intégral',amount:'CHF 8’000 HT',expected:'acq',why:'Les conditions du cas entraînent l’impôt sur les acquisitions; l’impôt déclaré peut aussi être déduit ici puisque le droit est intégral.'},
  {id:'L11',date:'18.06',label:'Importation de marchandises — DTe au nom de la société, droit à déduction rempli',amount:'TVA import CHF 1’215',expected:'dte',why:'La TVA à l’importation n’est pas le ch. 383; la DTe constitue la pièce de preuve pour l’IP.'},
  {id:'L12',date:'30.06',label:'Part privée véhicule — montant net déjà déterminé selon l’hypothèse pédagogique, soumis au taux normal',amount:'CHF 3’600 HT',expected:'std',why:'Dans ce scénario, le montant déterminé constitue une contre-prestation/base imposable au taux normal.'}
];

const FIELDS=[
  ['ch200','ch. 200 — Total des contre-prestations',80600],
  ['ch205','ch. 205 — Dont prestations imposées par option',12000],
  ['ch220','ch. 220 — Prestations exonérées',15000],
  ['ch221','ch. 221 — Prestations fournies à l’étranger',10000],
  ['ch235','ch. 235 — Diminutions de contre-prestation',2000],
  ['ch299','ch. 299 — Chiffre d’affaires imposable',53600],
  ['ch303','ch. 303 — Base au taux normal',53600],
  ['ch383base','ch. 383 — Base acquisitions',8000],
  ['ch383tax','ch. 383 — Impôt sur les acquisitions',648],
  ['ch399','ch. 399 — Total impôt dû',4989.60],
  ['ch400','ch. 400 — IP charges / marchandises',4293],
  ['ch405','ch. 405 — IP investissements',4050],
  ['ch479','ch. 479 — Total IP',8343],
  ['ch500','ch. 500 — Montant à payer',0],
  ['ch510','ch. 510 — Solde en faveur de l’assujetti',3353.40],
  ['ch900','ch. 900 — Subventions',5000],
  ['ch910','ch. 910 — Dons',2000]
];

const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const fmt=value=>new Intl.NumberFormat('fr-CH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(value||0));
function parseAmount(value){
  const s=String(value??'').trim();if(!s)return null;
  const n=Number(s.replace(/CHF/gi,'').replace(/[’'\s\u00a0\u202f]/g,'').replace(',','.'));
  return Number.isFinite(n)?n:null;
}
function closeEnough(a,b){return Number.isFinite(a)&&Math.abs(a-b)<=0.011}
function load(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')||{answers:{},fields:{},bestScore:0,attempts:0}}catch{return{answers:{},fields:{},bestScore:0,attempts:0}}}
function save(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
let state=load();

function sourceLinks(){return Object.values(SOURCES).map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('')}
function treatmentOptions(selected=''){return TREATMENTS.map(([value,label])=>`<option value="${esc(value)}" ${selected===value?'selected':''}>${esc(label)}</option>`).join('')}

function launcherMarkup(){
  const status=state.bestScore?`Meilleur score: ${state.bestScore} %${state.bestScore>=PASS_PERCENT?' · atelier réussi':''}`:'Pas encore tenté';
  return `<section class="atelier-launcher" id="level1AtelierLedger"><div><p class="atelier-kicker">Atelier autonome · après les cas guidés</p><h2>Mini-grand-livre → décompte TVA</h2><p>12 opérations non préclassées. Qualifiez chaque ligne puis reconstruisez les principales rubriques du décompte sans modifier votre progression 18/18.</p><span class="atelier-status">${esc(status)}</span></div><button class="btn primary" type="button" data-atelier-open="ledger">Ouvrir l’atelier</button></section>`;
}

function dialogMarkup(){
  return `<dialog class="atelier-dialog" id="level1AtelierDialog" aria-labelledby="level1AtelierTitle"><div class="atelier-shell"><header class="atelier-head"><div><p class="atelier-kicker">Niveau 1 · pratique de synthèse</p><h2 id="level1AtelierTitle">Atelier — Mini-grand-livre</h2><p>Alpina Conseil & Services Sàrl · T2 2026 · méthode effective · contre-prestations convenues. Tous les montants de chiffre d’affaires indiqués comme HT sont nets de TVA.</p></div><button class="atelier-close" type="button" aria-label="Fermer" data-atelier-close>×</button></header><div class="atelier-body"><section class="atelier-brief"><strong>Mission</strong><p>Vous recevez un extrait de grand livre et quelques pièces. Commencez par qualifier les 12 lignes. Ensuite, construisez le décompte. Les hypothèses nécessaires (lieu, option, statut du fournisseur, droit à déduction) sont déjà précisées: ne les généralisez pas à d’autres dossiers.</p></section><section><div class="atelier-section-head"><div><p class="atelier-kicker">Étape 1</p><h3>Qualifier les lignes du grand livre</h3></div><span>12 contrôles</span></div><div class="atelier-ledger">${LEDGER.map(line=>`<article class="atelier-ledger-row" data-ledger-row="${line.id}"><div class="atelier-ledger-meta"><span>${esc(line.date)}</span><strong>${esc(line.id)}</strong></div><div class="atelier-ledger-main"><strong>${esc(line.label)}</strong><span>${esc(line.amount)}</span></div><label>Traitement TVA<select data-atelier-line="${line.id}">${treatmentOptions(state.answers?.[line.id]||'')}</select></label><div class="atelier-inline-feedback" data-line-feedback="${line.id}"></div></article>`).join('')}</div></section><section><div class="atelier-section-head"><div><p class="atelier-kicker">Étape 2</p><h3>Reconstruire le décompte</h3></div><span>${FIELDS.length} contrôles</span></div><div class="atelier-fields">${FIELDS.map(([key,label])=>`<label><span>${esc(label)}</span><input type="text" inputmode="decimal" data-atelier-field="${key}" value="${esc(state.fields?.[key]??'')}" placeholder="0.00"><small>CHF</small></label>`).join('')}</div></section><section class="atelier-actions"><button class="btn primary" type="button" data-atelier-check>Vérifier l’atelier</button><button class="btn" type="button" data-atelier-reset>Réinitialiser</button><span>Réussite pédagogique dès ${PASS_PERCENT} %. Le score de cet atelier n’entre pas dans l’attestation 18/18.</span></section><div class="atelier-result" id="level1AtelierResult" aria-live="polite"></div><section class="atelier-sources"><h3>Sources de travail</h3>${sourceLinks()}</section></div></div></dialog>`;
}

function renderLauncher(){const old=document.querySelector('#level1AtelierLedger');if(old)old.outerHTML=launcherMarkup();else document.querySelector('#finalEvaluation')?.insertAdjacentHTML('beforebegin',launcherMarkup());bindLauncher();}
function ensureDialog(){if(!document.querySelector('#level1AtelierDialog'))document.body.insertAdjacentHTML('beforeend',dialogMarkup());bindDialog();}
function bindLauncher(){document.querySelector('[data-atelier-open="ledger"]')?.addEventListener('click',()=>{ensureDialog();const d=document.querySelector('#level1AtelierDialog');if(!d.open)d.showModal();});}
function bindDialog(){
  const d=document.querySelector('#level1AtelierDialog');if(!d||d.dataset.bound)return;d.dataset.bound='1';
  d.querySelector('[data-atelier-close]')?.addEventListener('click',()=>d.close());
  d.addEventListener('click',event=>{if(event.target===d)d.close();});
  d.addEventListener('change',event=>{const line=event.target.closest('[data-atelier-line]');if(line){state.answers[line.dataset.atelierLine]=line.value;save(state);}});
  d.addEventListener('input',event=>{const field=event.target.closest('[data-atelier-field]');if(field){state.fields[field.dataset.atelierField]=field.value;save(state);}});
  d.querySelector('[data-atelier-check]')?.addEventListener('click',checkAtelier);
  d.querySelector('[data-atelier-reset]')?.addEventListener('click',()=>{if(!confirm('Réinitialiser toutes les réponses de cet atelier?'))return;state={answers:{},fields:{},bestScore:state.bestScore||0,attempts:state.attempts||0};save(state);d.outerHTML=dialogMarkup();ensureDialog();document.querySelector('#level1AtelierDialog').showModal();});
}

function checkAtelier(){
  let correct=0;const total=LEDGER.length+FIELDS.length;const errors=[];
  for(const line of LEDGER){const got=state.answers?.[line.id]||'';const good=got===line.expected;if(good)correct++;else errors.push(`<li><strong>${esc(line.id)}</strong> — ${esc(line.why)}<br><span>Attendu: ${esc(TREATMENTS.find(x=>x[0]===line.expected)?.[1]||line.expected)}</span></li>`);const box=document.querySelector(`[data-line-feedback="${line.id}"]`);if(box){box.className=`atelier-inline-feedback ${good?'is-good':'is-bad'}`;box.textContent=good?'✓ Qualification correcte':'✕ À revoir';}}
  for(const [key,label,expected] of FIELDS){const actual=parseAmount(state.fields?.[key]);const good=closeEnough(actual,expected);if(good)correct++;else errors.push(`<li><strong>${esc(label)}</strong> — attendu CHF ${fmt(expected)}${actual===null?' (champ vide)':' · saisi CHF '+fmt(actual)}</li>`);const input=document.querySelector(`[data-atelier-field="${key}"]`);if(input){input.classList.toggle('atelier-good',good);input.classList.toggle('atelier-bad',!good);}}
  const percent=Math.round(correct/total*100);state.attempts=(state.attempts||0)+1;state.bestScore=Math.max(Number(state.bestScore)||0,percent);state.lastScore=percent;state.lastAttemptAt=new Date().toISOString();save(state);renderLauncher();
  const result=document.querySelector('#level1AtelierResult');if(result){result.innerHTML=`<section class="atelier-score ${percent>=PASS_PERCENT?'is-pass':'is-retry'}"><div><strong>${percent} %</strong><span>${correct}/${total} contrôles corrects · tentative ${state.attempts}</span></div><p>${percent>=PASS_PERCENT?'Atelier réussi. Reprenez néanmoins chaque erreur avant de considérer le dossier comme propre.':'Le dossier n’est pas encore suffisamment fiable. Corrigez les points signalés puis vérifiez à nouveau.'}</p></section>${errors.length?`<details class="atelier-correction" open><summary>Points à corriger (${errors.length})</summary><ul>${errors.join('')}</ul></details>`:'<div class="atelier-all-good"><strong>✓ Dossier cohérent.</strong> Les 12 qualifications et les rubriques demandées concordent avec le scénario.</div>'}<div class="atelier-reconciliation"><strong>Contrôle final attendu</strong><span>ch. 299 = ch. 379 = CHF 53’600.00</span><span>ch. 399 CHF 4’989.60 − ch. 479 CHF 8’343.00 = solde ch. 510 CHF 3’353.40</span></div>`;result.scrollIntoView({behavior:'smooth',block:'start'});}
}

function init(){renderLauncher();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
