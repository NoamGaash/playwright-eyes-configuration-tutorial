# Motivation

Sometimes we'd like to:
* set different API key
* set different browsers
* set different test titles
and so on...

This simple tutorial will guide you through on how to customize different settings in different levels of granularity.

Let's get started!

## How to execute the examples in this repo

1. clone the repository
1. checkout the relevant branch (if needed)
1. set `APPLITOOLS_API_KEY` environment variable
1. execute `npx playwright test`

# Per file / describe block configurations
The easiest way to add a configuration for one specific file / describe block would be using `test.use` to set eyes settings.

Example - 
```
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
```

[example branch name - `docs/example-test.use`](https://github.com/NoamGaash/playwright-eyes-configuration-tutorial/commit/8510a81776bed02c21855519531064e1a8cae631)

* 💡 tip - `test.use` can be used inside a describe block. That's useful if we want to apply specific configuration to a subset of the tests in a file.
* 💡 note - two tests are created on Eyes dashboard as we asked from the UFG to render the page on two browsers

# Per project configurations
Using playwright projects, it's possible to use `testMatch` or `testDir` and set a different configurations to different group of tests.
This example tests all files with a name that end with `.fully.spec.ts` with `fully: true`

```js
{
    name: 'full page tests',
    testMatch: /.*\.fully\.spec\.ts/,
    use: {
        ...devices['Desktop Chrome'],
        eyesConfig: {
            fully: false,
        }
    },
}
```

[branch name - `docs/example-project-config`](https://github.com/NoamGaash/playwright-eyes-configuration-tutorial/commit/9d30ee53e81ef1b45c74bdef6a8070082504c4b5)

# Per team / folder
Use fixture syntax to override the configuration for specific team / folder

First, make a file for the fixture:
```js
import { test as base, expect } from '@applitools/eyes-playwright/fixture';

const test = base.extend({
    eyesConfig: {
        apiKey: process.env.TEAM_API_KEY,
        browsersInfo: [
            // our team wants to test only on chrome
            {name: 'chrome', width: 800, height: 600},
        ]
    },
})

export { test, expect };
```

and then import `test` from the fixture file:

```js
import { expect, test } from './utils/teamFixtures';
```

Now, only files that import `test` from this location will get those settings :) 

[branch name - `docs/example--configuration-in-fixture`](https://github.com/NoamGaash/playwright-eyes-configuration-tutorial/commit/c639fb2b00d13b913b1be905fe278d07344f2182)


# global configurations
See example on the main branch:

https://github.com/NoamGaash/playwright-eyes-configuration-tutorial/blob/157e0f1557b17358e2ee33c38918974b593e145a/playwright.config.ts#L9-L11

This configuration will be applied by default to all tests, unless it's overrided elsewhere

# Custom - configuration based on test properties

It's also possible to make the customize eyes configuration fixture using the information from the testInfo object and even other fixtures.

For example, consider the following fixture:

```js
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
```

* if the test includes the tag `@fully`, a full page screenshot will be taken
* if the test includes the tag `@mobile`, smaller chrome sizes will come into action
* the baseURL defined in the Playwright project will be reflected as a custom test property

[example branch name - `docs/custom-fixtures`](https://github.com/NoamGaash/playwright-eyes-configuration-tutorial/compare/main...docs/custom-fixtures)

