import assert from 'node:assert/strict';
import '../level1-extension.js';
import { CASES, FIELD_META, SOURCE_LIBRARY } from '../data.js';
import { computeEffective, validateCaseArithmetic } from '../logic.js';

assert.equal(CASES.length,18,'Le Niveau 1 étendu doit contenir 18 cas.');
assert.equal(new Set(CASES.map(c=>c.id)).size,CASES.length,'Les identifiants de cas doivent être uniques.');
for(const c of CASES){
  assert.ok(c.title&&c.task&&c.qualification,`Cas ${c.id}: métadonnées obligatoires manquantes.`);
  for(const key of c.fields)assert.ok(FIELD_META[key],`Cas ${c.id}: champ inconnu ${key}.`);
  for(const key of c.sourceKeys)assert.ok(SOURCE_LIBRARY[key],`Cas ${c.id}: source inconnue ${key}.`);
  const {result,errors}=validateCaseArithmetic(c);
  assert.deepEqual(errors,[],errors.join('\n'));
  assert.ok(!(result.ch500>0&&result.ch510>0),`Cas ${c.id}: 500 et 510 positifs simultanément.`);
}
const byId=id=>CASES.find(c=>c.id===id);
const checks={A:[8100,3240,4860],M:[6480,2430,4050],N:[9720,4050,5670],O:[3847.5,2000,1847.5],P:[7399.35,3000,4399.35],Q:[9720,5000,4720],R:[64800,40000,24800]};
for(const [id,[due,ip,pay]] of Object.entries(checks)){const r=computeEffective(byId(id).expected);assert.equal(r.ch399,due,`${id}: ch399`);assert.equal(r.ch479,ip,`${id}: ch479`);assert.equal(r.ch500,pay,`${id}: ch500`)}
assert.equal(computeEffective(byId('B').expected).ch510,200);
assert.equal(computeEffective(byId('C').expected).ch399,12900);
assert.equal(computeEffective(byId('D').expected).ch299,110000);
assert.equal(computeEffective(byId('E').expected).ch479,9000);
assert.equal(computeEffective(byId('F').expected).ch510,2450);
assert.equal(computeEffective(byId('G').expected).ch500,1980);
assert.equal(computeEffective(byId('H').expected).ch500,870);
assert.equal(computeEffective(byId('I').expected).ch299,200000);
assert.equal(computeEffective(byId('J').expected).ch299,150000);
assert.equal(computeEffective(byId('K').expected).ch479,6000);
assert.equal(computeEffective(byId('L').expected).ch500,1550);
for(const [id,re] of [['B',/mesures organisationnelles appropriées/i],['H',/qualifie expressément/i],['I',/non exclusivement à des fins d’habitation/i],['J',/acquéreur est assujetti/i],['K',/légalement pas été déduit à l’origine/i],['M',/contre-prestations convenues/i],['N',/décision de taxation électronique/i],['O',/0,9500/],['P',/0,9 %/],['Q',/décompte rectificatif/i],['R',/5’005’000/]])assert.match(byId(id).info,re,`Cas ${id}: garde-fou pédagogique manquant.`);
assert.match(FIELD_META.ch900.sub,/élimination des déchets.*approvisionnement en eau/i);
console.log('OK — 18 cas méthode effective Niveau 1: intégrité et calculs audités.');
