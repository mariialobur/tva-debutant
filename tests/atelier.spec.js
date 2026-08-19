import {test,expect} from '@playwright/test';

const fields={ch200:'77000',ch205:'12000',ch220:'15000',ch221:'10000',ch235:'2000',ch289:'27000',ch299:'50000',ch303:'50000',ch379:'50000',ch383base:'8000',ch383tax:'648',ch399:'4698',ch400:'4293',ch405:'4050',ch479:'8343',ch500:'0',ch510:'3645',ch900:'5000'};

async function clean(page){await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload()}

test('Level 1 exposes one compact declaration synthesis exercise without changing 18-case progression',async({page})=>{
  await clean(page);
  const launcher=page.locator('#level1AtelierDeclaration');
  await expect(launcher).toBeVisible();
  await expect(launcher).toContainText('Remplir un décompte complet');
  await expect(launcher).toContainText('Aucun audit de pièces ni grand livre');
  await launcher.getByRole('button',{name:'Ouvrir l’exercice'}).click();
  const dialog=page.locator('#level1AtelierDialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.atelier-brief li')).toHaveCount(10);
  await expect(dialog.locator('[data-atelier-field]')).toHaveCount(18);
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
});

test('declaration synthesis can be completed to a coherent 100 percent result',async({page})=>{
  await clean(page);
  await page.locator('[data-atelier-open="declaration"]').click();
  const dialog=page.locator('#level1AtelierDialog');
  for(const [key,value] of Object.entries(fields)) await dialog.locator(`[data-atelier-field="${key}"]`).fill(value);
  await dialog.locator('[data-atelier-check]').click();
  await expect(dialog.locator('#level1AtelierResult')).toContainText('100 %');
  await expect(dialog.locator('#level1AtelierResult')).toContainText('Décompte cohérent');
  await expect(dialog.locator('#level1AtelierResult')).toContainText('ch. 299 = ch. 379 = CHF 50’000.00');
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('tva_effective_atelier_ledger_v1')));
  expect(saved.scope).toBe('declaration-v2');
  expect(saved.bestScore).toBe(100);
});
