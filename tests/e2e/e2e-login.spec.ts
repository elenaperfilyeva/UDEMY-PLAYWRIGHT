import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    // Before hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })

    // Positive scenario + Logout
    test('Positive Scenario for login + logout', async ({ page }) => {
        // await page.click('#signin_button')
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')

        // to avoid SSL Certificate Error
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })

    // Negative Scenario: wrong username
    test('Negative Scenario for login: wrong username', async ({ page }) => {
        // await page.click('#signin_button')
        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'password')

        // AbstractPage class usage example
        // await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    // Negative Scenario: wrong password
    test('Negative Scenario for login: wrong password', async ({ page }) => {
        // await page.click('#signin_button')
        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'password')
        await loginPage.assertErrorMessage()
    })
})
