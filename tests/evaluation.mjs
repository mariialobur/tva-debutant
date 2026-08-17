import assert from 'node:assert/strict';
import { EXAM_SIZE, PASS_SCORE, QUESTION_BANK } from '../evaluation-data.js';

assert.equal(EXAM_SIZE,12);
assert.equal(PASS_SCORE,9);
assert.ok(QUESTION_BANK.length>=18,'La banque finale doit contenir au moins 18 questions.');
assert.equal(new Set(QUESTION_BANK.map(q=>q.id)).size,QUESTION_BANK.length,'IDs de questions uniques.');

for(const q of QUESTION_BANK){
  assert.ok(q.q && q.w && q.s && q.u,`Question ${q.id}: métadonnées manquantes.`);
  assert.equal(q.o.length,4,`Question ${q.id}: exactement 4 options.`);
  assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,`Question ${q.id}: réponse invalide.`);
  assert.equal(new Set(q.o).size,4,`Question ${q.id}: options dupliquées.`);
}
console.log(`OK — évaluation finale: ${QUESTION_BANK.length} questions auditées structurellement.`);
