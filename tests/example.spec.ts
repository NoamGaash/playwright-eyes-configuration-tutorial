import { expect, test } from './utils/teamFixtures';

test('basic check', {
  tag: ['@fully', '@mobile'],
}, async ({ page, eyes }) => {
  await page.setContent('<h1>Hello World</h1>');

  // first option -
  await eyes.check()
  // second option -
  await expect(page).toHaveScreenshot();
});
