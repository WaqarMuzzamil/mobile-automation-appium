import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';

class ProductDetailPage extends BasePage {

    public get addToCartButton() {
        return $('~Tap to add product to cart');
    }

    public get itemCount() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/noTV")');
    }

    public get increaseQuantityButton() {
        return $('~Increase item quantity');
    }

    public get decreaseQuantityButton() {
        return $('~Decrease item quantity');
    }

    public async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    public async isAddToCartButtonDisabled(): Promise<boolean> {
        return !(await this.addToCartButton.isEnabled());
    }

    public async validateAddToCartButtonDisabled(): Promise<void> {
        const isDisabled = await this.isAddToCartButtonDisabled();
        if (!isDisabled) {
            throw new Error('Add to cart button is not disabled');
        }
    }

    public async getItemCount(): Promise<number> {
        const countText = await this.itemCount.getText();
        return parseInt(countText, 10);
    }

    public async clickIncreaseQuantity(): Promise<void> {
        await this.increaseQuantityButton.click();
    }

    public async clickDecreaseQuantity(): Promise<void> {
        await this.decreaseQuantityButton.click();
    }

}

export default new ProductDetailPage();
