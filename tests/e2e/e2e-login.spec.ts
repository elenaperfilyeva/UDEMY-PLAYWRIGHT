import { test, expect } from '@playwright/test'

test.describe.parallel('Login / Logout Flow', () => {
    // Before hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com')
    })

    // Positive scenario + Logout
    test('Positive Scenario for login + logout', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
        // to avoid SSL Certificate Error
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })

    // Negative Scenario: wrong username
    test('Negative Scenario for login: wrong username', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'invalid username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
        
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong')
    })

    // Negative Scenario: wrong password
    test('Negative Scenario for login: wrong password', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'invalid password')
        await page.click('text=Sign in')
        
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong')
    })
})