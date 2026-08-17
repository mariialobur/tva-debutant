import assert from 'node:assert/strict';
import fs from 'node:fs';
for(const file of ['index.html','styles.css','evaluation.css','data.js','level1-extension.js','logic.js','store.js','app.js','evaluation.js','evaluation-data.js'])assert.ok(fs.existsSync(file),`Missing ${file}`);
const html=fs.readFileSync('index.html','utf8');
for(const token of ['app.js?v=2.1.0','evaluation.js?v=2.0.0','styles.css?v=2.0.0','evaluation.css?v=1.0.0','Mémo professionnel','finalEvaluation','0 / 18 cas'])assert.ok(html.includes(token),`Missing token: ${token}`);
const evalJs=fs.readFileSync('evaluation.js','utf8');
for(const token of ['ATTESTATION DE PARCOURS','tva_effective_final_evaluation_v2','meilleur résultat conservé','Niveau 1'])assert.ok(evalJs.includes(token),`Missing evaluation token: ${token}`);
console.log('OK — smoke effective Niveau 1 v2.1');
