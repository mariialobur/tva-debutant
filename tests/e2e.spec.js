import { test, expect } from '@playwright/test';

const ids='ABCDEFGHIJKLMNOPQR'.split('');
const masteredRecords=count=>Object.fromEntries(ids.slice(0,count).map(id=>[id,{bestEvaluationScore:100}]));

async function clean(page){
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
}

test('desktop: Level 1 exposes the complete 18-case parcours and keeps the final exam locked', async ({page})=>{
  await clean(page);
  await expect(page.getByRole('heading',{name:/Parcours pratique du décompte TVA suisse/i})).toBeVisible();
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
  await expect(page.locator('#tabs button')).toHaveCount(18);
  await expect(page.locator('#caseSelect option')).toHaveCount(18);
  await expect(page.getByText('Alpina Conseil Sàrl')).toBeVisible();
  await expect(page.locator('#startFinal')).toBeDisabled();
  await expect(page.locator('#finalEvaluation')).toContainText('Progression: 0/18');
  await page.getByRole('button',{name:'Mémo professionnel'}).click();
  await expect(page.getByRole('heading',{name:/Mémo professionnel/i})).toBeVisible();
  await expect(page.getByText('Mode de décompte, factures et acomptes',{exact:true})).toBeVisible();
  await expect(page.getByText('International, importation et impôt sur les acquisitions',{exact:true})).toBeVisible();
});

test('Case M adds three controlled timing variants without changing the 18-case score',async({page})=>{
  await clean(page);
  await page.locator('#tabs button').nth(12).click();
  const panel=page.locator('#controlledVariantsM');
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Convenues, reçues ou acompte ?');
  await expect(panel).toContainText('0/3');

  await panel.getByLabel('T2 2026').first().check();
  await panel.getByRole('button',{name:'Vérifier la variante'}).click();
  await expect(panel.locator('.cv-feedback')).toContainText('Correct');

  await panel.getByRole('tab',{name:/M-B · Reçues/}).click();
  await panel.getByLabel('T3 2026').check();
  await panel.getByRole('button',{name:'Vérifier la variante'}).click();
  await expect(panel.locator('.cv-feedback')).toContainText('Correct');

  await panel.getByRole('tab',{name:/M-C · Acompte/}).click();
  await panel.getByLabel('Le déclarer en T2 2026').check();
  await panel.getByRole('button',{name:'Vérifier la variante'}).click();
  await expect(page.locator('#controlledVariantsM')).toContainText('3/3');
  await expect(page.locator('#globalProgress')).toContainText('0 / 18');
});

test('Case M controlled variants stay hidden during scored evaluation mode',async({page})=>{
  await clean(page);
  await page.locator('#tabs button').nth(12).click();
  await expect(page.locator('#controlledVariantsM')).toBeVisible();
  await page.locator('[data-mode="evaluate"]').click();
  await expect(page.locator('#controlledVariantsM')).toHaveCount(0);
});

test('mobile: selector reaches the last new annual-return case and the form remains usable', async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await clean(page);
  await expect(page.locator('#caseSelect')).toBeVisible();
  await page.locator('#caseSelect').selectOption('17');
  await expect(page.locator('#sidebar')).toContainText('MicroTech Sàrl');
  await expect(page.locator('#sidebar')).toContainText('Décompte annuel');
  await expect(page.getByText('Vue pédagogique du décompte')).toBeVisible();
  await expect(page.locator('input[data-field="ch200"]')).toBeVisible();
});

test('shared progress combines both effective levels from local browser state', async ({page})=>{
  await page.addInitScript(({l1,l2})=>{
    localStorage.setItem('tva_effective_v2_state',JSON.stringify({records:l1}));
    localStorage.setItem('tva_avance_v1_state',JSON.stringify({records:l2}));
  },{l1:masteredRecords(3),l2:masteredRecords(2)});
  await page.goto('/');
  const bar=page.locator('#effectivePathProgress');
  await expect(bar).toContainText('Niveau 1 3/18');
  await expect(bar).toContainText('Niveau 2 2/18');
  await expect(bar).toContainText('Total 5/36');
});

test('18 mastered cases unlock a 15-question final evaluation', async ({page})=>{
  await page.addInitScript(records=>{
    localStorage.setItem('tva_effective_v2_state',JSON.stringify({records}));
  },masteredRecords(18));
  await page.goto('/');
  await expect(page.locator('#globalProgress')).toContainText('18 / 18');
  await expect(page.locator('#startFinal')).toBeEnabled();
  await page.locator('#startFinal').click();
  await expect(page.locator('#effectiveExamLayer')).toBeVisible();
  await expect(page.locator('#effectiveExamLayer .exam-q')).toHaveCount(15);
  await expect(page.locator('#effectiveExamLayer')).toContainText('réussite dès 12/15');
});
