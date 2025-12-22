import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';
import { ShippingAddress } from '../../models/shipping-address.model';

class ShippingAddressPage extends BasePage {

    public get fullNameInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/fullNameET")');
    }

    public get address1Input() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/address1ET")');
    }

    public get address2Input() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/address2ET")');
    }

    public get cityInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cityET")');
    }

    public get stateInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/stateET")');
    }

    public get zipInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/zipET")');
    }

    public get countryInput() {
        return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/countryET")');
    }

    public get saveButton() {
        return $('~Saves user info for checkout');
    }

    public async fillAndSaveAddress(address: ShippingAddress): Promise<void> {
        await this.fullNameInput.clearValue();
        await this.fullNameInput.setValue(address.fullName);
        await this.address1Input.clearValue();
        await this.address1Input.setValue(address.address1);
        await this.address2Input.clearValue();
        await this.address2Input.setValue(address.address2);
        await this.cityInput.clearValue();
        await this.cityInput.setValue(address.city);
        await this.stateInput.clearValue();
        await this.stateInput.setValue(address.state);
        await this.zipInput.clearValue();
        await this.zipInput.setValue(address.zip);
        await this.countryInput.clearValue();
        await this.countryInput.setValue(address.country);
        await this.saveButton.scrollIntoView();
        await this.saveButton.click();
    }

}

export default new ShippingAddressPage();
