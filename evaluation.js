import { CASES } from './data.js';
import { loadState } from './store.js';
import { EXAM_SIZE, PASS_SCORE, PROJECT_URL, QUESTION_BANK } from './evaluation-data.js';

const STORAGE_KEY='tva_effective_final_evaluation_v2';
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let attempt=null,lastResult=loadResult();

function loadResult(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch{return null}}
function saveResult(r){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(r))}catch{}lastResult=r}
function masteredCount(){const s=loadState();return CASES.filter(c=>(s.records?.[c.id]?.bestEvaluationScore||0)===100).length}

function launcher(){
  const host=document.querySelector('#finalEvaluation');
  if(!host)return;
  const done=masteredCount(),total=CASES.length,unlocked=done===total;
  host.innerHTML=`<section class="final-launcher"><div><span class="eyebrow">Validation finale · Niveau 1</span><h2>Évaluation finale — méthode effective</h2><p>${unlocked?`Les ${total} cas ont été validés à 100 % en mode Évaluation. Vous pouvez passer le test final sans aide.`:`Validez d’abord les ${total} cas à 100 % en mode Évaluation. Progression: ${done}/${total}.`}</p></div><div class="final-actions"><button class="btn primary" id="startFinal" ${unlocked?'':'disabled'}>Commencer l’évaluation finale</button>${lastResult?.passed&&unlocked?'<button class="btn" id="openAttestation">Attestation de parcours</button>':''}</div></section>`;
  document.querySelector('#startFinal')?.addEventListener('click',startExam);
  document.querySelector('#openAttestation')?.addEventListener('click',openNameDialog);
}

function startExam(){
  if(masteredCount()!==CASES.length)return;
  const chosen=shuffle(QUESTION_BANK).slice(0,EXAM_SIZE).map(q=>({...q,options:shuffle(q.o.map((label,i)=>({label,correct:i===q.a})))}));
  attempt={questions:chosen,startedAt:new Date().toISOString()};
  renderExam();
}

function renderExam(){
  const layer=document.createElement('div');
  layer.id='effectiveExamLayer';layer.setAttribute('role','dialog');layer.setAttribute('aria-modal','true');
  layer.innerHTML=`<div class="exam-shell"><div class="exam-head"><div><span class="eyebrow">Sans aide · Niveau 1</span><h1 tabindex="-1">Évaluation finale — méthode effective</h1><p>${EXAM_SIZE} questions · réussite dès ${PASS_SCORE}/${EXAM_SIZE}</p></div><button class="icon-btn" id="closeExam" aria-label="Fermer">×</button></div><form id="examForm">${attempt.questions.map((q,idx)=>`<fieldset class="exam-q"><legend>${idx+1}. ${esc(q.q)}</legend>${q.options.map((o,oi)=>`<label><input type="radio" name="q${idx}" value="${oi}"><span>${esc(o.label)}</span></label>`).join('')}</fieldset>`).join('')}<div id="examError" class="seal" hidden></div><button class="btn primary exam-submit" type="submit">Remettre l’évaluation</button></form></div>`;
  document.body.appendChild(layer);document.querySelector('main')?.setAttribute('inert','');document.querySelector('.top')?.setAttribute('inert','');
  layer.querySelector('h1').focus();layer.querySelector('#closeExam').onclick=closeExam;layer.querySelector('#examForm').onsubmit=submitExam;
}
function closeExam(){document.querySelector('#effectiveExamLayer')?.remove();document.querySelector('main')?.removeAttribute('inert');document.querySelector('.top')?.removeAttribute('inert')}

function submitExam(e){
  e.preventDefault();const form=new FormData(e.currentTarget);
  const missing=attempt.questions.filter((_,i)=>form.get('q'+i)===null).length;
  if(missing){const box=e.currentTarget.querySelector('#examError');box.hidden=false;box.textContent=`Répondez aux ${missing} question${missing>1?'s':''} restante${missing>1?'s':''} avant de remettre l’évaluation.`;return}
  const review=[];let score=0;
  attempt.questions.forEach((q,i)=>{const selected=Number(form.get('q'+i)),chosen=q.options[selected],correct=Boolean(chosen?.correct);if(correct)score++;review.push({q:q.q,selected:chosen?.label||'',correctAnswer:q.options.find(o=>o.correct)?.label||'',correct,why:q.w,s:q.s,u:q.u})});
  const passed=score>=PASS_SCORE,result={score,total:EXAM_SIZE,percent:Math.round(score/EXAM_SIZE*100),passed,date:new Date().toISOString(),review};
  if(passed&&(!lastResult?.passed||score>(lastResult.score||0)))saveResult(result);else if(!lastResult?.passed)saveResult(result);
  renderReview(result);launcher();
}

function renderReview(result){
  const shell=document.querySelector('.exam-shell');
  shell.innerHTML=`<div class="exam-head"><div><span class="eyebrow">Résultat · Niveau 1</span><h1>${result.passed?'Évaluation réussie':'Évaluation à reprendre'}</h1><p><strong>${result.score}/${result.total}</strong> · ${result.percent}% · seuil ${PASS_SCORE}/${EXAM_SIZE}${lastResult?.passed&&lastResult.score>result.score?` · meilleur résultat conservé: ${lastResult.score}/${EXAM_SIZE}`:''}</p></div><button class="icon-btn" id="closeExam" aria-label="Fermer">×</button></div><div class="exam-review">${result.review.map((r,i)=>`<article class="review ${r.correct?'ok':'bad'}"><h3>${i+1}. ${esc(r.q)}</h3><p><strong>Votre réponse:</strong> ${esc(r.selected)}</p>${r.correct?'':`<p><strong>Réponse attendue:</strong> ${esc(r.correctAnswer)}</p>`}<p>${esc(r.why)}</p><a href="${esc(r.u)}" target="_blank" rel="noopener noreferrer">${esc(r.s)} ↗</a></article>`).join('')}<div class="exam-bottom"><button class="btn" id="retryExam">Nouvelle tentative</button>${result.passed||lastResult?.passed?'<button class="btn primary" id="attestAfter">Attestation de parcours</button>':''}</div></div>`;
  shell.querySelector('#closeExam').onclick=closeExam;shell.querySelector('#retryExam').onclick=()=>{closeExam();startExam()};shell.querySelector('#attestAfter')?.addEventListener('click',()=>{closeExam();openNameDialog()});
}

function openNameDialog(){
  if(!lastResult?.passed||masteredCount()!==CASES.length)return;let d=document.querySelector('#nameDialog');
  if(!d){d=document.createElement('dialog');d.id='nameDialog';d.className='name-dialog';d.innerHTML=`<form method="dialog"><div class="dialog-head"><h2>Attestation de parcours — Niveau 1</h2><button value="cancel" class="icon-btn" aria-label="Fermer">×</button></div><p>Le nom est utilisé uniquement dans votre navigateur pour générer l’attestation. L’identité n’est pas vérifiée.</p><label>Nom indiqué sur l’attestation<input id="participantName" maxlength="90" required></label><div class="dialog-actions"><button value="cancel" class="btn">Annuler</button><button id="makeAttestation" value="default" class="btn primary">Générer</button></div></form>`;document.body.appendChild(d);d.querySelector('#makeAttestation').onclick=e=>{e.preventDefault();const name=d.querySelector('#participantName').value.trim();if(!name)return;d.close();renderAttestation(name)}}d.showModal();
}

function renderAttestation(name){
  const score=lastResult.score,totalCases=CASES.length,date=new Intl.DateTimeFormat('fr-CH',{dateStyle:'long'}).format(new Date(lastResult.date));
  const themes=[
    ['Fondamentaux','Taux légaux, chiffre d’affaires, impôt dû, impôt préalable et lecture du décompte.'],
    ['Ventilation','Taux normal, réduit et spécial; restauration, hébergement et diminutions de contre-prestation.'],
    ['International','Exportations, lieu de prestation, impôt sur les acquisitions, importations de biens et DTe.'],
    ['Impôt préalable','Ch. 400/405, double affectation, corrections, réductions et dégrèvement ultérieur.'],
    ['Pratique fiduciaire','Contre-prestations convenues/reçues, acomptes, devises, parts privées et justificatifs.'],
    ['Périodes et corrections','Décompte rectificatif, périodicité annuelle, acomptes AFC et contrôle de cohérence.'],
    ['Situations particulières','Subventions, dons, option immobilière, procédure de déclaration et changements d’affectation.']
  ];
  const wrap=document.createElement('div');wrap.id='attestationLayer';
  wrap.innerHTML=`<div class="attest-actions"><button class="btn" id="closeAttest">Fermer</button><button class="btn primary" id="printAttest">Imprimer / enregistrer en PDF</button></div><section class="attest-page page-one"><div class="attest-kicker">Parcours pédagogique indépendant</div><h1>ATTESTATION DE PARCOURS</h1><h2>Méthode effective de la TVA suisse · Niveau 1</h2><p class="attest-name">${esc(name)}</p><p class="attest-main">a validé les <strong>${totalCases} cas pratiques en mode Évaluation</strong> et a réussi l’auto-évaluation finale du Niveau 1 consacré à la méthode effective.</p><div class="attest-stats"><div><strong>${totalCases} / ${totalCases}</strong><span>cas validés à 100 %</span></div><div><strong>${score} / ${EXAM_SIZE}</strong><span>évaluation finale</span></div><div><strong>${date}</strong><span>date du résultat</span></div></div><div class="attest-themes">${themes.map(t=>`<span>${esc(t[0])}</span>`).join('')}</div><p class="attest-url">${PROJECT_URL}</p><p class="attest-disclaimer">Cette attestation confirme uniquement l’achèvement de ce parcours d’entraînement indépendant et la réussite de son auto-évaluation finale. Elle ne constitue ni un diplôme, ni un titre professionnel, ni une certification reconnue ou accréditée. Ce projet est indépendant et sans affiliation avec l’AFC/ESTV ou le SEFRI. Le nom est saisi par le participant; son identité n’est pas vérifiée. Le résultat est généré localement et n’est pas vérifiable par un tiers auprès du site.</p></section><section class="attest-page page-two"><h1>RELEVÉ DU PARCOURS</h1><p class="attest-sub">Contenu et thèmes travaillés dans l’entraînement pratique.</p><div class="attest-person"><strong>${esc(name)}</strong><span>${totalCases} cas validés · résultat final ${score}/${EXAM_SIZE}</span></div><div class="attest-grid">${themes.map(t=>`<article><h3>${esc(t[0])}</h3><p>${esc(t[1])}</p></article>`).join('')}</div><div class="attest-reference"><strong>Référentiel pédagogique</strong><p>LTVA · OTVA · prototype et publications AFC utilisés dans les cas. Les sources officielles et la pratique en vigueur restent déterminantes pour un dossier réel.</p><p>${PROJECT_URL}</p></div><p class="attest-disclaimer">Ce relevé décrit les thèmes abordés. Il n’atteste pas de compétences professionnelles, d’un diplôme ou d’une certification reconnue. Il est généré localement à partir de la progression et du résultat enregistrés dans le navigateur.</p></section>`;
  document.body.appendChild(wrap);document.body.classList.add('attestation-open');wrap.querySelector('#closeAttest').onclick=()=>{wrap.remove();document.body.classList.remove('attestation-open')};wrap.querySelector('#printAttest').onclick=()=>window.print();
}

window.addEventListener('effective-progress',launcher);window.addEventListener('DOMContentLoaded',launcher);
