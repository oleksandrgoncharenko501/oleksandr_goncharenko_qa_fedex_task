import {defineConfig, devices} from '@playwright/test';


export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    fullyParallel: false,
    retries: 0,
    workers: 2,
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list']
    ],
    use: {
        baseURL: 'http://localhost:4200',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        navigationTimeout: 10000,
        actionTimeout: 10000,
    },
    projects: [
        {
            name: 'fedex_app_chrome',
            use: {...devices['Desktop Chrome'],
                headless: true},
        }
    ],
    webServer: {
        command: 'npm start',
        url: 'http://localhost:4200',
        reuseExistingServer: false,
        timeout: 120000,
        stdout: 'ignore',
        stderr: 'pipe',
    },
});



