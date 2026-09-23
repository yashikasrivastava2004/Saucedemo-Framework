import { BasePage } from './basePage.js';

export default class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);

        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');

        this.continueButton = page.locator('#continue');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.finalTotal = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.confirmationMessage = page.locator('.complete-header');
        this.backToProductsButton = page.locator('#back-to-products');
    }

    async enterCustomerDetails(firstName, lastName, postalCode) {
        await this.fill(this.firstName, firstName);
        await this.fill(this.lastName, lastName);
        await this.fill(this.postalCode, postalCode);
    }

    async continueToSummary() {
        await this.click(this.continueButton);
    }

    async getItemTotal() {

        const text = await this.getText(this.itemTotal);
        return Number(text.replace('Item total: $', ''));
    }

    async getTax() {

        const text = await this.getText(this.tax);
        return Number(
            text.replace('Tax: $', '')
        );
    }

    async getFinalTotal() {

        const text = await this.getText(this.finalTotal);
        return Number(
            text.replace('Total: $', '')
        );
    }

    async completePurchase() {
        await this.click(this.finishButton);
    }

    async getConfirmationMessage() {
        return await this.getText(this.confirmationMessage);
    }

    async backToProducts() {
        await this.click(this.backToProductsButton);
    }
}