import { test, expect } from '@playwright/test';

test('desktop: app loads and case A is usable', async ({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Parcours pratique du décompte TVA suisse/i})).toBeVisible();
  await expect(page.getByText('Alpina Conseil Sàrl')).toBeVisible();
  await page.getByRole('button',{name:'Mémo professionnel'}).click();
  await expect(page.getByRole('heading',{name:/Mémo professionnel/i})).toBeVisible();
});

test('mobile: case selector and form render', async ({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await expect(page.locator('#caseSelect')).toBeVisible();
  await expect(page.getByText('Vue pédagogique du décompte')).toBeVisible();
});
