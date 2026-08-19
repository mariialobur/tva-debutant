import {test,expect} from '@playwright/test';

const classifications={L1:'std',L2:'export',L3:'abroad',L4:'option',L5:'credit',L6:'subsidy',L7:'donation',L8:'ip400',L9:'ip405',L10:'acq',L11:'dte',L12:'std'};
const fields={ch200:'80600',ch205:'12000',ch220:'15000',ch221:'10000',ch235:'2000',ch299:'53600',ch303:'53600',ch383base:'8000',ch383tax:'648',ch399:'4989.60',ch400:'4293',ch405:'4050',ch479:'8343',ch500:'0',ch510:'3353.40',ch900:'5000',ch910:'2000'};

async function clean(page){await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload()}

test('Level 1 exposes the autonomous mini-ledger atelier without changing 18-case progression',async({page})=>{
  await clean(page);
  const launcher=page.locator('#level1AtelierLedger');
  await expect(launcher).toBeVisible();
  await expect(launcher).toContainText('Mini-grand-livre → décompte TVA');
  await launcher.getByRole('button',{name:'Ouvrir l’atelier'}).click();
  const dialog=page.locator('#level1AtelierDialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-ledger-row]')).toHaveCount(12);
  await expect(dialog.locator('[data-atelier-field]')).toHaveCount(17);
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
});

test('mini-ledger can be reconstructed to a fully coherent 100 percent result',async({page})=>{
  await clean(page);
  await page.locator('[data-atelier-open="ledger"]').click();
  const dialog=page.locator('#level1AtelierDialog');
  for(const [id,value] of Object.entries(classifications)) await dialog.locator(`[data-atelier-line="${id}"]`).selectOption(value);
  for(const [key,value] of Object.entries(fields)) await dialog.locator(`[data-atelier-field="${key}"]`).fill(value);
  await dialog.locator('[data-atelier-check]').click();
  await expect(dialog.locator('#level1AtelierResult')).toContainText('100 %');
  await expect(dialog.locator('#level1AtelierResult')).toContainText('Dossier cohérent');
  await expect(dialog.locator('#level1AtelierResult')).toContainText('ch. 299 = ch. 379 = CHF 53’600.00');
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('tva_effective_atelier_ledger_v1')));
  expect(saved.bestScore).toBe(100);
});
