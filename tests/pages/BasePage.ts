import {Page, expect, Locator} from '@playwright/test';

export abstract class BasePage {
    constructor(protected readonly page: Page) {
    }

    get title(): Locator {
        return this.page.locator('h1');
    }

    async goto(url: string = '/'): Promise<void> {
        await this.page.goto(url);
    }

    async expectTitle(pattern: RegExp | string): Promise<void> {
        await expect(this.title).toHaveText(pattern);
    }
}

