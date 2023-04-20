import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Filter Transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    // Login
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        // to avoid SSL Certificate Error
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Verify the results for each account', async ({ page }) => {
        await page.click('#account_activity_tab')

        // Checking account
        await page.selectOption('#aa_accountId', '2')
        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        // Loan account
        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        // Brokerage account
        await page.selectOption('#aa_accountId', '6')
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
    })
})
