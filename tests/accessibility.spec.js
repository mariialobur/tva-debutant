import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function blocking(violations){return violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.length}))}

async function scan(page){
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  expect(blocking(result.violations)).toEqual([]);
}

test('desktop initial Level 1 has no serious or critical automated WCAG violations',async({page})=>{
  await page.goto('/');
  await expect(page.locator('#uxWorkbar')).toBeVisible();
  await scan(page);
});

test('mobile working view has no serious or critical automated WCAG violations',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.locator('#caseSelect').selectOption('17');
  await expect(page.locator('#uxMobileVerify')).toBeVisible();
  await scan(page);
});
