import { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig<EyesFixture>({
  testDir: './tests',
  fullyParallel: true,
  reporter: '@applitools/eyes-playwright/reporter',
  use: {
    eyesConfig: {
      type: 'ufg'
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
