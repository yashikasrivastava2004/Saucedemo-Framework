import { BasePage } from './basePage.js';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async login(username, password) {

        await this.fill(this.username, username);
        await this.fill(this.password, password);
        await this.click(this.loginButton);
    }
}