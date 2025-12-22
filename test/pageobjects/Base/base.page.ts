import { $ } from '@wdio/globals';
import menuPage from './menu.page';

class BasePage {
    public menu = menuPage;

    public get cartIcon() {
        return $('~Displays number of items in your cart');
    }

    public get cartCount() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartTV")');
    }

    public async getCartCountValue(): Promise<string> {
        return await this.cartCount.getText();
    }

    public async openCart() {
        await this.cartIcon.click();
    }

    public async validateCartCount(expectedCount: string | number): Promise<boolean> {
        const actualCount = await this.getCartCountValue();
        return actualCount === expectedCount.toString();
    }

    public async assertCartCount(expectedCount: string | number): Promise<void> {
        const isValid = await this.validateCartCount(expectedCount);
        if (!isValid) {
            const actualCount = await this.getCartCountValue();
            throw new Error(`Cart count validation failed. Expected: ${expectedCount}, but got: ${actualCount}`);
        }
    }
}

export { BasePage };
export default new BasePage();
