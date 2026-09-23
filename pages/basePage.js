export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async goto(url = '') {
        await this.page.goto(url);
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return await locator.innerText();
    }

    async getTexts(locator) {
        return await locator.allTextContents();
    }

    async selectOption(locator, value) {
        await locator.selectOption(value);
    }
}