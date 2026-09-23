import { BasePage } from './basePage.js';

export default class CartPage extends BasePage {

    constructor(page) {
        super(page);

        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.checkoutButton = page.locator('#checkout');
    }

    // Get number of products in cart
    async getItemCount() {
        return await this.cartItems.count();
    }

    // Get product names
    async getItemNames() {
        return await this.itemNames.allTextContents();
    }

    // Get product prices
    async getItemPrices() {

        const priceTexts = await this.itemPrices.allTextContents();

        const prices = [];

        for (let price of priceTexts) {
            prices.push(Number(price.replace('$', '')));
        }

        return prices;
    }

    // Proceed to checkout
    async checkout() {
        await this.click(this.checkoutButton);
    }
}