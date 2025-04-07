import { test as base, expect } from '@applitools/eyes-playwright/fixture';

const test = base.extend({
    eyesConfig: {
        apiKey: process.env.TEAM_API_KEY || process.env.APPLITOOLS_API_KEY,
        browsersInfo: [
            // our team wants to test only on chrome
            {name: 'chrome', width: 800, height: 600},
        ]
    },
})

export { test, expect };