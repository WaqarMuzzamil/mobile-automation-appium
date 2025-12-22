import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';

class CartPage extends BasePage {

    public get noItemTitle() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/noItemTitleTV")');
    }

    public get emptyCartMessage() {
        return $('android=new UiSelector().text("Oh no! Your cart is empty. Fill it up with swag to complete your purchase.")');
    }

    public get shoppingButton() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/shoppingBt")');
    }

    public get removeItemButton() {
        return $('~Removes product from cart');
    }

    public get decreaseQuantityButton() {
        return $('~Decrease item quantity');
    }

    public get increaseQuantityButton() {
        return $('~Increase item quantity');
    }

    public get confirmCheckoutButton() {
        return $('~Confirms products for checkout');
    }

    public get itemsCount() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/itemsTV")');
    }

    public async getItemsCount(): Promise<number> {
        const itemsText = await this.itemsCount.getText();
        const count = parseInt(itemsText.split(' ')[0], 10);
        return count;
    }

    public async clickContinueShopping(): Promise<void> {
        await this.shoppingButton.click();
    }

    public async clickRemoveItem(): Promise<void> {
        await this.removeItemButton.click();
    }

    public async isEmptyCartMessageVisible(): Promise<boolean> {
        return await this.emptyCartMessage.isDisplayed();
    }

    public async validateEmptyCartMessageVisible(): Promise<void> {
        const isVisible = await this.isEmptyCartMessageVisible();
        if (!isVisible) {
            throw new Error('Empty cart message is not visible');
        }
    }

    public async clearCart(): Promise<void> {
        try {
            await this.openCart();
            await this.clickRemoveItem();
            await this.shoppingButton.waitForDisplayed();
        } catch (error) {
            console.log('Cart cleanup failed - continuing:', error);
        }
    }

    public async itemsCountMatchesBasePage(): Promise<boolean> {
        const cartPageCount = await this.getItemsCount();
        const basePageCount = parseInt(await this.getCartCountValue(), 10);
        return cartPageCount === basePageCount;
    }

    public async validateItemsCountMatchesBasePage(): Promise<void> {
        const matches = await this.itemsCountMatchesBasePage();
        if (!matches) {
            const cartPageCount = await this.getItemsCount();
            const basePageCount = await this.getCartCountValue();
            throw new Error(`Items count mismatch. Cart page shows: ${cartPageCount} items, BasePage shows: ${basePageCount}`);
        }
    }

}

export default new CartPage();
