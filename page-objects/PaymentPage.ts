import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectbox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator
    readonly paySavedPayeeTab: Locator
    readonly addNewPayeeTab: Locator
    readonly purchaseForeignCurrencyTab: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectbox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectbox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
        this.paySavedPayeeTab = page.locator('text=Pay Saved Payee')
        this.addNewPayeeTab = page.locator('text=Add New Payee')
        this.purchaseForeignCurrencyTab = page.locator('text=Purchase Foreign Currency')
    }

    async createPayment() {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectbox.selectOption('6')
        await this.amountInput.type('5000')
        await this.dateInput.type('2021-11-09')
        await this.descriptionInput.type('some random message')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText(
            'The payment was successfully submitted'
        )
    }

    async clickOnTab(tabName) {
        switch(tabName) {
            case 'Pay Saved Payee':
                await this.paySavedPayeeTab.click()
                break
            case 'Add New Payee':
                await this.addNewPayeeTab.click()
                break
            case 'Purchase Foreign Currency':
                await this.purchaseForeignCurrencyTab.click()
                break
            default:
                throw new Error('This tab does not exist.')
        }
    }
}