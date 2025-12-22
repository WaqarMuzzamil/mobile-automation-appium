import { expect } from '@wdio/globals'
import LoginPage from '../pages/LogIn/login.page'
import ProcuctPage from '../pages/Produts/products.page'
import { secrets } from '../config/dev.secrets'

describe('My Login application', () => {
    it('should login successfully with valid credentials and logout', async () => {
        // App launches on home screen, navigate to login via menu
        await LoginPage.menu.selectLoginMenuItem();

        await LoginPage.login(secrets.username, secrets.password);
        await expect(ProcuctPage.title).toBeExisting();
        await expect(ProcuctPage.title).toHaveText(
            expect.stringContaining('Products'));

        // Logout and validate navigation back to login page
        await LoginPage.menu.logout();
        await LoginPage.validateLoginPageDisplayed();
    });

    it('should display error message when login is attempted without entering credentials', async () => {
        // App launches on home screen, navigate to login via menu
        await LoginPage.menu.selectLoginMenuItem();

        await LoginPage.clickLoginWithoutInput();
        await expect(LoginPage.usernameError).toBeExisting();
        await expect(LoginPage.usernameError).toHaveText(
            expect.stringContaining('Username is required'));
    });

    it('should display error message when login is attempted with username but without password', async () => {
        // App launches on home screen, navigate to login via menu
        await LoginPage.menu.selectLoginMenuItem();

        await LoginPage.clickLoginWithUsernameOnly(secrets.username);
        await expect(LoginPage.passwordError).toBeExisting();
        await expect(LoginPage.passwordError).toHaveText(
            expect.stringContaining('Enter Password'));
    });
});

