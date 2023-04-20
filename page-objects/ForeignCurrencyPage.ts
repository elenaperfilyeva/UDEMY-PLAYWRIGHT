import { expect, Locator, Page } from '@playwright/test'

export class ForeignCurrencyPage {
    readonly page: Page
    readonly currencySelectbox: Locator
    readonly sellRateMessage: Locator
    readonly amounInput: Locator
    readonly inDollarsRadiobutton: Locator
    readonly calculateCostsButton: Locator
    readonly conversionAmountMessage: Locator
    readonly purchaseButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.currencySelectbox = page.locator('#pc_currency')
        this.sellRateMessage = page.locator('#sp_sell_rate')
        this.amounInput = page.locator('#pc_amount')
        this.inDollarsRadiobutton = page.locator('#pc_inDollars_true')
        this.calculateCostsButton = page.locator('#pc_calculate_costs')
        this.conversionAmountMessage = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.successMessage = page.locator('#alert_content')
    }

    async createCurrencyPurchase() {
        await this.currencySelectbox.selectOption('EUR')
        await expect(this.sellRateMessage).toContainText('1 euro (EUR)')
        await this.amounInput.type('1000')
        await this.inDollarsRadiobutton.click()
        await this.calculateCostsButton.click()

        await expect(this.conversionAmountMessage).toContainText('1000.00 U.S. dollar (USD)')
        await this.purchaseButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.successMessage).toBeVisible()
        await expect(this.successMessage).toContainText(
            'Foreign currency cash was successfully purchased'
        )
    }
}