import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';
import { ShippingAddress } from '../../models/shipping-address.model';
import { PaymentMethod } from '../../models/payment-method.model';

class CheckoutPage extends BasePage {

    public get checkoutTitle() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/checkoutTitleTV")');
    }

    public get fullNameText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/fullNameTV")');
    }

    public get addressText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/addressTV")');
    }

    public get cityText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cityTV")');
    }

    public get countryText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/countryTV")');
    }

    public get cardHolderText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cardHolderTV")');
    }

    public get cardNumberText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cardNumberTV")');
    }

    public get expirationDateText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/expirationDateTV")');
    }

    public get completeCheckoutButton() {
        return $('~Completes the process of checkout');
    }

    public get completeText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/completeTV")');
    }

    public get thankYouText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/thankYouTV")');
    }

    public get swagText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/swagTV")');
    }

    public get orderText() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/orderTV")');
    }

    public get continueCatalogButton() {
        return $('~Tap to open catalog');
    }

    public async isCheckoutTitleVisible(): Promise<boolean> {
        return await this.checkoutTitle.isDisplayed();
    }

    public async validateCheckoutTitleVisible(): Promise<void> {
        const isVisible = await this.isCheckoutTitleVisible();
        if (!isVisible) {
            throw new Error('Checkout title is not visible');
        }
    }

    public async validateShippingAddress(shippingAddress: ShippingAddress): Promise<void> {
        const fullName = await this.fullNameText.getText();
        const address = await this.addressText.getText();
        const city = await this.cityText.getText();
        const country = await this.countryText.getText();

        if (!fullName.includes(shippingAddress.fullName)) {
            throw new Error(`Full name mismatch. Expected: ${shippingAddress.fullName}, but got: ${fullName}`);
        }

        if (!address.includes(shippingAddress.address1) ) {
            throw new Error(`Address mismatch. Expected: ${shippingAddress.address1}, but got: ${address}`);
        }

        if (!city.includes(shippingAddress.city) || !city.includes(shippingAddress.state)) {
            throw new Error(`City/State mismatch. Expected: ${shippingAddress.city}, ${shippingAddress.state}, but got: ${city}`);
        }

        if (!country.includes(shippingAddress.country) || !country.includes(shippingAddress.zip)) {
            throw new Error(`Country/Zip mismatch. Expected: ${shippingAddress.country}, ${shippingAddress.zip}, but got: ${country}`);
        }
    }

    public async validatePaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
        const cardHolder = await this.cardHolderText.getText();
        const cardNumber = await this.cardNumberText.getText();
        const expirationDate = await this.expirationDateText.getText();
        

        await browser.execute('mobile: scroll', { direction: 'down', percent: 70 });
        
        if (!cardHolder.includes(paymentMethod.name)) {
            throw new Error(`Card holder mismatch. Expected: ${paymentMethod.name}, but got: ${cardHolder}`);
        }

        const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, '');
        if (!cardNumberWithoutSpaces.includes(paymentMethod.cardNumber)) {
            throw new Error(`Card number mismatch. Expected: ${paymentMethod.cardNumber}, but got: ${cardNumber}`);
        }

        if (!expirationDate.includes(paymentMethod.expirationDate)) {
            throw new Error(`Expiration date mismatch. Expected: ${paymentMethod.expirationDate}, but got: ${expirationDate}`);
        }
    }

    public async validateCheckoutData(shippingAddress: ShippingAddress, paymentMethod: PaymentMethod): Promise<void> {
        await this.validateShippingAddress(shippingAddress);
        await this.validatePaymentMethod(paymentMethod);
    }

    public async clickCompleteCheckout(): Promise<void> {
        await this.completeCheckoutButton.click();
    }

    public async placeOrder(): Promise<void> {
        await this.completeCheckoutButton.click();
    }

    public async validateOrderConfirmation(): Promise<void> {
        const completeText = await this.completeText.getText();
        if (!completeText.includes('Checkout Complete')) {
            throw new Error(`Checkout complete text mismatch. Expected to contain "Checkout Complete", but got: ${completeText}`);
        }

        const thankYouText = await this.thankYouText.getText();
        if (!thankYouText.includes('Thank you for your order')) {
            throw new Error(`Thank you text mismatch. Expected to contain "Thank you for your order", but got: ${thankYouText}`);
        }

        const swagText = await this.swagText.getText();
        if (!swagText.includes('Your new swag is on its way')) {
            throw new Error(`Swag text mismatch. Expected to contain "Your new swag is on its way", but got: ${swagText}`);
        }

        const orderText = await this.orderText.getText();
        if (!orderText.includes('Your order has been dispatched and will arrive as fast as the pony gallops')) {
            throw new Error(`Order text mismatch. Expected to contain "Your order has been dispatched and will arrive as fast as the pony gallops", but got: ${orderText}`);
        }
    }

    public async clickContinueCatalog(): Promise<void> {
        await this.continueCatalogButton.click();
    }

    public async continueShopping(): Promise<void> {
        await this.clickContinueCatalog();
    }

}

export default new CheckoutPage();
