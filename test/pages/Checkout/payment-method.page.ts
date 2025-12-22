import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';
import { PaymentMethod } from '../../models/payment-method.model';

class PaymentMethodPage extends BasePage {

    public get nameInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/nameET")');
    }

    public get cardNumberInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cardNumberET")');
    }

    public get expirationDateInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/expirationDateET")');
    }

    public get securityCodeInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/securityCodeET")');
    }

    public get saveButton() {
        return $('~Saves payment info and launches screen to review checkout data');
    }

    public async fillAndSavePayment(payment: PaymentMethod): Promise<void> {
        await this.nameInput.clearValue();
        await this.nameInput.setValue(payment.name);
        await this.cardNumberInput.clearValue();
        await this.cardNumberInput.setValue(payment.cardNumber);
        await this.expirationDateInput.clearValue();
        await this.expirationDateInput.setValue(payment.expirationDate);
        await this.securityCodeInput.clearValue();
        await this.securityCodeInput.setValue(payment.securityCode);
        await this.saveButton.scrollIntoView();
        await this.saveButton.click();
    }

}

export default new PaymentMethodPage();
