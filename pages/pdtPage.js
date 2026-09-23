import { BasePage } from './basePage.js';

export default class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.inventoryContainer = page.locator('.inventory_list');
        this.productItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async isProductsPageDisplayed() {
        return await this.inventoryContainer.isVisible();
    }

    async sortByPriceLowToHigh() {
        await this.selectOption(this.sortDropdown, 'lohi');
    }

    async getProductPrices() {

        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map(price =>Number(price.replace('$', '')));
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async getProducts() {
        const count = await this.productItems.count();
        const products = [];
        for (let i = 0; i < count; i++) {

            const product = this.productItems.nth(i);
            const name = await product.locator('.inventory_item_name').innerText();

            const priceText = await product.locator('.inventory_item_price').innerText();
            const price = Number(priceText.replace('$', ''));
            products.push({name,price});
        }

        return products;
    }

    async addProductToCart(productName) {

        const product = this.productItems.filter({hasText: productName});
        await product.getByRole('button', { name: 'add to cart' }).click();
    }

    async openCart() {
        await this.click(this.cartLink);
    }

    async addPdtByIndex(index){
        // const pdtIndex = this.page.locator('.inventory_item').nth(index).locator('button');
        const pdtIndex = this.productItems.nth(index).locator('button');
        await pdtIndex.click();
    }
}