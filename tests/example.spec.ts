import { expect, test } from '@applitools/eyes-playwright/fixture';

test('basic check', async ({ page, eyes }) => {
  await page.setContent('<h1>Hello World</h1>');

  // first option -
  await eyes.check()
  // second option -
  await expect(page).toHaveScreenshot();
});
