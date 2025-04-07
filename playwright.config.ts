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
      name: 'full page tests',
      testMatch: /.*\.fully\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        eyesConfig: {
          fully: false,
        }
      },
    },
    {
      name: 'viewport tests',
      testMatch: /.*\.viewport\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        eyesConfig: {
          fully: false,
        }
      },
    },
    {
      name: 'all other tests',
      // regex that matches all other tests (tests that doesn't end with .fully.spec.ts or .viewport.spec.ts)
      testMatch: /^(?!.*\.fully\.spec\.ts|.*\.viewport\.spec\.ts).*\.spec\.ts$/,
      use: {...devices['Desktop Chrome']} ,
    }
  ],
});
