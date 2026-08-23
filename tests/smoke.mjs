import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

for(const file of ['index.html','styles.css','evaluation.css','data.js','level1-extension.js','logic.js','store.js','app.js','evaluation.js','evaluation-data.js','exam-blueprint.js','ux-v3.js','progress-ui.js','controlled-variants.js','atelier-loader.js','atelier-practice.js','atelier-practice.css'])assert.ok(fs.existsSync(file),`Missing ${file}`);
for(const file of ['app.js','evaluation.js','evaluation-data.js','exam-blueprint.js','level1-extension.js','store.js','ux-v3.js','progress-ui.js','controlled-variants.js','atelier-loader.js','atelier-practice.js'])execFileSync(process.execPath,['--check',file],{stdio:'pipe'});

const html=fs.readFileSync('index.html','utf8');
for(const token of ['app.js?v=2.1.0','evaluation.js?v=3.3.0','progress-ui.js?v=1.4.0','styles.css?v=2.0.0','evaluation.css?v=1.0.0','Mémo professionnel','finalEvaluation','0 / 18 maîtrisés'])assert.ok(html.includes(token),`Missing token: ${token}`);

const evalJs=fs.readFileSync('evaluation.js','utf8');
for(const token of ['ATTESTATION DE RÉUSSITE DU PARCOURS','tva_effective_final_evaluation_v3_blueprint','ASSESSMENT_VERSION=\'blueprint-v2\'','meilleur résultat conservé','Niveau 1','selectBlueprintQuestions','5 blocs de compétences','ce repère n’est pas une condition d’accès','Les réponses attendues ne sont pas affichées après un échec','remplissage de déclarations TVA','level1-extension.js'])assert.ok(evalJs.includes(token),`Missing evaluation token: ${token}`);
assert.ok(!evalJs.includes('Validez d’abord les'),'Legacy 18/18 exam gate returned');
assert.ok(!evalJs.includes("['Pratique fiduciaire'"),'Legacy fiduciaire attestation theme returned');

const storeJs=fs.readFileSync('store.js','utf8');
assert.match(storeJs,/tva_effective_final_evaluation_v3_blueprint/);
assert.match(storeJs,/level1-extension\.js/);
assert.match(storeJs,/atelier-loader\.js/);
assert.match(storeJs,/tva_effective_atelier_ledger_v1/);

const atelier=fs.readFileSync('atelier-practice.js','utf8');
for(const token of ['Remplir un décompte complet','Aucun audit de pièces ni grand livre','const PASS_PERCENT=85','ch. 299 = ch. 379 = CHF 50’000.00','STATE_SCOPE=\'declaration-v2\''])assert.ok(atelier.includes(token),`Missing atelier token: ${token}`);

console.log('OK — smoke effective Niveau 1 declaration trainer v2.4.0');
