import { test as base, expect } from '@playwright/test';

import LoginPage from '../pages/loginPage.js';
import ProductsPage from '../pages/pdtPage.js';
import CartPage from '../pages/cartPage.js';
import CheckoutPage from '../pages/checkOutPage.js';

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
});

export { expect };