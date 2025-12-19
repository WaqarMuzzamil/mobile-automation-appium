import { $ } from '@wdio/globals'
import BasePage from './base.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]');
    }

    public get inputPassword () {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]');
    }

    public get btnSubmit () {
        return $('~Tap to login with given credentials');
    }

    public get loginTitle () {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/loginTV"]');
    }

    public get usernameError () {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/nameErrorTV"]');
    }

    public get passwordError () {
        return $('//*[@resource-id="com.saucelabs.mydemoapp.android:id/passwordErrorTV"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public async clickLoginWithUsernameOnly (username: string) {
        await this.inputUsername.setValue(username);
        await this.btnSubmit.click();
    }

    public async validateLoginPageDisplayed() {
        await expect(this.loginTitle).toBeExisting();
    }

    public async clickLoginWithoutInput() {
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }
}

export default new LoginPage();
