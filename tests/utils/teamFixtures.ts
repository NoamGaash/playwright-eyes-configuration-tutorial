import { test as base, expect, EyesConfig } from '@applitools/eyes-playwright/fixture';
import type { TestInfo } from '@playwright/test';

const test = base.extend({
    eyesConfig: ({baseURL}, use, testInfo: TestInfo) => use({
        fully: testInfo.tags.includes('@fully'),
        browsersInfo: [
            {name: 'chrome', width: 800, height: 600},
            ...(testInfo.tags.includes('@mobile') ? [
                {name: 'chrome', width: 375, height: 667},
                {name: 'chrome', width: 768, height: 1024},
            ] as const : []),
        ],
        properties: [
            {name: 'baseUrl', value: baseURL}
        ]
    } satisfies EyesConfig),
})

export { test, expect };