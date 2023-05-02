import { test, expect } from '@playwright/test'

test.describe("Visual Regression Testing Example", () => {
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto('https://example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test("Single Element Snapshot", async ({ page }) => {
        await page.goto('https://example.com')
        const pageElement = await page.$('h1')
        expect(await pageElement?.screenshot()).toMatchSnapshot('page-title.png')
    })
})
