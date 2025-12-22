import { $ } from '@wdio/globals'
import { BasePage } from '../Base/base.page';

class LoginPage extends BasePage {

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
}

export default new LoginPage();
