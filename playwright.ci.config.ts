import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
    ...baseConfig,
    use: {
        ...baseConfig.use,
    },
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['github'],
        ['list']
    ],
});

