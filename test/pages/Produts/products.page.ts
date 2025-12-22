import { $ } from '@wdio/globals';
import { BasePage } from '../Base/base.page';

class ProductsPage extends BasePage {

    public get title() {
        return $('~title');
    }
    
    public get firstProduct() {
        return $(
            'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/productIV").instance(0)'
        );
    }

}

export default new ProductsPage();
