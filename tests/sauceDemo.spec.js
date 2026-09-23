import { test, expect } from '../fixtures/fixture.js';

test('SauceDemo complete purchase flow', async ({page, loginPage, productsPage, cartPage, checkoutPage }) => {

    // 1. Navigate
    await test.step('Navigate to SauceDemo', async () => {
        await page.goto('/');
        await expect(page).toHaveURL(/saucedemo\.com/);
    });


    // 2. Login
    await test.step('Login to SauceDemo', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
    });


    // 3. Verify Products Page
    await test.step('Verify Products page is displayed', async () => {
        await expect(productsPage.inventoryContainer).toBeVisible();
        await expect(productsPage.productItems).toHaveCount(6);
    });


    // 4. Sort products Low → High
    let products;

    await test.step('Sort products by price low to high', async () => {
        await productsPage.sortByPriceLowToHigh();
        products = await productsPage.getProducts();
        console.log('Sorted products:', products);   //display the sorted products in the terminal
    });


    // 5. Verify product ordering
    await test.step('Verify products are sorted by price', async () => {
    const prices = products.map(product => product.price);
    
    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
    });


    // 6. Get the first two cheapest products
    const cheapestProduct = products[0];
    const secondCheapestProduct = products[1];

    // verify cheapest pdts
    await test.step('Verify cheapest products', async () => {
    expect(cheapestProduct.price).toBeLessThanOrEqual(secondCheapestProduct.price);

    console.log('Cheapest product:', cheapestProduct);
    console.log('Second cheapest product:', secondCheapestProduct);
    }); 


    // 7. Add first two products
    await test.step('Add two cheapest products to cart', async () => {
        await productsPage.addPdtByIndex(0);
        await productsPage.addPdtByIndex(1);
    });


    // 8. Open cart
    await test.step('Open shopping cart', async () => {

        await productsPage.openCart();
        await expect(page).toHaveURL(/cart\.html/);
    });


    // 9. Verify exactly 2 products
    await test.step('Verify exactly two products are in cart', async () => {

        await expect(cartPage.cartItems).toHaveCount(2);
    });


    // 10. Verify product names
    await test.step('Verify product names', async () => {

        const actualNames = await cartPage.getItemNames();
        expect(actualNames).toContain(cheapestProduct.name);
        expect(actualNames).toContain(secondCheapestProduct.name);
    });


    // 11. Verify product prices
    await test.step('Verify product prices', async () => {

        const actualPrices =await cartPage.getItemPrices();
        expect(actualPrices).toContain(cheapestProduct.price);
        expect(actualPrices).toContain(secondCheapestProduct.price);
    });


    // 12. Checkout
    await test.step('Proceed to checkout', async () => {

        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one\.html/);
    });


    // 13. Enter customer details
    await test.step('Enter customer details', async () => {

        await checkoutPage.enterCustomerDetails(
            'Yashika',
            'Srivastava',
            '160101'
        );
    });


    // 14. Continue to summary
    await test.step('Continue to order summary', async () => {

        await checkoutPage.continueToSummary();
        await expect(page).toHaveURL(/checkout-step-two\.html/);
    });


    // 15. Validate Item Total, Tax and Final Total
    let itemTotal;
    let tax;
    let finalTotal;

    await test.step('Validate order totals', async () => {

        itemTotal = await checkoutPage.getItemTotal();
        tax = await checkoutPage.getTax();
        finalTotal = await checkoutPage.getFinalTotal();

        const expectedItemTotal = cheapestProduct.price + secondCheapestProduct.price;

        // Item Total = sum of product prices
        expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);

        // Final Total = Item Total + Tax
        expect(finalTotal).toBeCloseTo(itemTotal + tax, 2);

        console.log('Item Total:', itemTotal);
        console.log('Tax:', tax);
        console.log('Final Total:', finalTotal);
    });


    // 16. Complete purchase
    await test.step('Complete purchase', async () => {
        await checkoutPage.completePurchase();
    });


    // 17. Verify confirmation
    await test.step('Verify purchase confirmation', async () => {
        await expect(checkoutPage.confirmationMessage).toBeVisible();
        await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    });


    // 18. Navigate back
    await test.step('Navigate back to products', async () => {
        await checkoutPage.backToProducts();
        await expect(page).toHaveURL(/inventory\.html/);
    });


    // 19. Verify cart is empty
    await test.step('Verify cart is empty', async () => {
        await expect(productsPage.cartBadge).toHaveCount(0);
    });

});