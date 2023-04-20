import { expect, Locator, Page } from '@playwright/test'

export class TransferFundsPage {
    readonly page: Page
    readonly fromAccountSelectbox: Locator
    readonly toAccountSelectbox: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly submitTransferButton: Locator
    readonly verifyHeader: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccountSelectbox = page.locator('#tf_fromAccountId')
        this.toAccountSelectbox = page.locator('#tf_toAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.submitTransferButton = page.locator('#btn_submit')
        this.verifyHeader = page.locator('h2.board-header')
        this.successMessage = page.locator('.alert-success')
    }

    async createTransfer() {
        await this.fromAccountSelectbox.selectOption('2')
        await this.toAccountSelectbox.selectOption('3')
        await this.amountInput.type('500')
        await this.descriptionInput.type('Test message')
        await this.submitTransferButton.click()
    }

    async assertVerifyHeader() {
        await expect(this.verifyHeader).toContainText('Verify')
        await this.submitTransferButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.successMessage).toContainText(
            'You successfully submitted your transaction'
        )
    }
}