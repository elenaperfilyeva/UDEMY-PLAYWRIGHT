import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { ForeignCurrencyPage } from '../../page-objects/ForeignCurrencyPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('Currency Exchange', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let foreignCurrenctPage: ForeignCurrencyPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        foreignCurrenctPage = new ForeignCurrencyPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        // to avoid SSL Certificate Error
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Should make currency exchange', async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')
        await paymentPage.clickOnTab('Purchase Foreign Currency')

        await foreignCurrenctPage.createCurrencyPurchase()
        await foreignCurrenctPage.assertSuccessMessage()
    })
})
