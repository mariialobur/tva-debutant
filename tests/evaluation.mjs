import assert from 'node:assert/strict';
import '../level1-extension.js';
import { EXAM_SIZE, PASS_SCORE, QUESTION_BANK } from '../evaluation-data.js';
import { selectBlueprintQuestions } from '../exam-blueprint.js';

assert.equal(EXAM_SIZE,15);
assert.equal(PASS_SCORE,12);
assert.ok(QUESTION_BANK.length>=30,'La banque finale étendue doit contenir au moins 30 questions.');
assert.equal(new Set(QUESTION_BANK.map(q=>q.id)).size,QUESTION_BANK.length,'IDs de questions uniques.');
for(const q of QUESTION_BANK){assert.ok(q.q&&q.w&&q.s&&q.u,`Question ${q.id}: métadonnées manquantes.`);assert.equal(q.o.length,4,`Question ${q.id}: exactement 4 options.`);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,`Question ${q.id}: réponse invalide.`);assert.equal(new Set(q.o).size,4,`Question ${q.id}: options dupliquées.`)}

const blueprint=[
  {label:'Fondamentaux du décompte',count:3,ids:['rate-normal','rate-reduced','rate-hotel','205','235','299','balance']},
  {label:'Chiffre d’affaires & international',count:3,ids:['export','abroad','225','900','910']},
  {label:'Acquisitions, importation & devises',count:3,ids:['acq','acq-deduct','import-vs-acquisition','dte-proof','fx-consistency']},
  {label:'Impôt préalable & corrections',count:3,ids:['410','415','420','residual','479','vehicle-private']},
  {label:'Périodes, rectification & annuel',count:3,ids:['timing-convenued','timing-advance','rectification','rectification-period','annual','annual-three-instalments','annual-deadline']}
];
const selected=selectBlueprintQuestions(QUESTION_BANK,blueprint,EXAM_SIZE,()=>0.314159);
assert.equal(selected.length,15);
assert.equal(new Set(selected.map(q=>q.id)).size,15);
for(const section of blueprint) assert.equal(selected.filter(q=>q.examTheme===section.label).length,section.count,`Quota manquant: ${section.label}`);
console.log(`OK — évaluation Niveau 1: ${QUESTION_BANK.length} questions, blueprint ${EXAM_SIZE}, seuil ${PASS_SCORE}.`);
