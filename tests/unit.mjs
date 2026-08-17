import assert from 'node:assert/strict';
import { CASES, FIELD_META, SOURCE_LIBRARY } from '../data.js';
import { computeEffective, validateCaseArithmetic } from '../logic.js';

assert.equal(CASES.length, 12, 'Le parcours audité doit conserver 12 cas avant extension.');
assert.equal(new Set(CASES.map(c => c.id)).size, CASES.length, 'Les identifiants de cas doivent être uniques.');

for (const c of CASES) {
  assert.ok(c.title && c.task && c.qualification, `Cas ${c.id}: métadonnées obligatoires manquantes.`);
  for (const key of c.fields) assert.ok(FIELD_META[key], `Cas ${c.id}: champ inconnu ${key}.`);
  for (const key of c.sourceKeys) assert.ok(SOURCE_LIBRARY[key], `Cas ${c.id}: source inconnue ${key}.`);
  const { result, errors } = validateCaseArithmetic(c);
  assert.deepEqual(errors, [], errors.join('\n'));
  assert.ok(!(result.ch500 > 0 && result.ch510 > 0), `Cas ${c.id}: 500 et 510 positifs simultanément.`);
}

const byId = id => CASES.find(c => c.id === id);

// A — 100'000 × 8.1 % − 3'240
{
  const r = computeEffective(byId('A').expected);
  assert.equal(r.ch399, 8100);
  assert.equal(r.ch479, 3240);
  assert.equal(r.ch500, 4860);
}

// B — deux taux
{
  const r = computeEffective(byId('B').expected);
  assert.equal(r.ch399, 4800);
  assert.equal(r.ch510, 200);
}

// C — trois taux
{
  const r = computeEffective(byId('C').expected);
  assert.equal(r.ch399, 12900);
  assert.equal(r.ch500, 5700);
}

// D — diminution de contre-prestation
{
  const r = computeEffective(byId('D').expected);
  assert.equal(r.ch289, 10000);
  assert.equal(r.ch299, 110000);
  assert.equal(r.ch500, 6910);
}

// E — correction de double affectation: 400 + 405 − 415
{
  const r = computeEffective(byId('E').expected);
  assert.equal(r.ch479, 9000);
  assert.equal(r.ch500, 3960);
}

// F — export exonéré
{
  const r = computeEffective(byId('F').expected);
  assert.equal(r.ch299, 50000);
  assert.equal(r.ch510, 2450);
}

// G — acquisition: impôt dû puis IP déductible selon les hypothèses
{
  const c = byId('G');
  assert.equal(c.expected.ch383tax, 1620);
  assert.equal(c.expected.ch400, 4620);
  const r = computeEffective(c.expected);
  assert.equal(r.ch399, 8100);
  assert.equal(r.ch479, 6120);
  assert.equal(r.ch500, 1980);
}

// H — subvention séparée du ch. 200 et réduction ch. 420
{
  const r = computeEffective(byId('H').expected);
  assert.equal(r.ch299, 70000);
  assert.equal(r.ch479, 4800);
  assert.equal(r.ch500, 870);
}

// I — ch. 205 informatif: il n'augmente ni ne diminue ch. 299
{
  const r = computeEffective(byId('I').expected);
  assert.equal(r.ch299, 200000);
  assert.equal(r.ch500, 4200);
}

// J — procédure de déclaration: 200 − 225
{
  const r = computeEffective(byId('J').expected);
  assert.equal(r.ch299, 150000);
  assert.equal(r.ch500, 3150);
}

// K — dégrèvement ultérieur augmente ch. 479
{
  const r = computeEffective(byId('K').expected);
  assert.equal(r.ch479, 6000);
  assert.equal(r.ch500, 2100);
}

// L — don au ch. 910 sans effet sur 200 / 479 dans les hypothèses
{
  const r = computeEffective(byId('L').expected);
  assert.equal(r.ch299, 50000);
  assert.equal(r.ch479, 2500);
  assert.equal(r.ch500, 1550);
}

// Régressions pédagogiques: les hypothèses sensibles doivent rester explicites.
assert.match(byId('B').info, /mesures organisationnelles appropriées/i);
assert.match(byId('H').info, /qualifie expressément/i);
assert.match(byId('I').info, /non exclusivement à des fins d’habitation/i);
assert.match(byId('J').info, /acquéreur est assujetti/i);
assert.match(byId('K').info, /légalement pas été déduit à l’origine/i);
assert.match(FIELD_META.ch900.sub, /élimination des déchets.*approvisionnement en eau/i);

console.log('OK — 12 cas méthode effective: intégrité et calculs audités.');
