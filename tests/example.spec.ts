import { expect, test } from '@applitools/eyes-playwright/fixture';

test.use({
  eyesConfig: {
    testName: (testInfo) => `Eyes Playwright - ${testInfo.title}`,
    browsersInfo: [
      {
        name: 'chrome',
        width: 800,
        height: 600,
      },
      {
        name: 'firefox',
        width: 800,
        height: 600,
      }
    ]
  }
})

test('basic check', async ({ page, eyes }) => {
  await page.setContent('<h1>Hello World</h1>');

  // first option -
  await eyes.check()
  // second option -
  await expect(page).toHaveScreenshot();
});
