import { test, expect } from '@playwright/test';

test('Plan marks a real unfinished draft En cours but keeps an empty draft À faire',async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('tva_effective_v2_state',JSON.stringify({
      records:{},
      drafts:{
        C:{practice:{values:{ch200:12345},qualification:'',assisted:false,submitted:false,correctionShown:false,lastScore:null}},
        D:{practice:{values:{},qualification:'',assisted:false,submitted:false,correctionShown:false,lastScore:null}}
      }
    }));
  });
  await page.goto('/');
  await page.locator('#uxLevelPlanOpen').click();
  const dialog=page.getByRole('dialog',{name:'Plan du niveau'});
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-plan-case-index="2"]')).toContainText('En cours');
  await expect(dialog.locator('[data-plan-case-index="3"]')).toContainText('À faire');
});
