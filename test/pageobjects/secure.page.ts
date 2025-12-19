import { $ } from '@wdio/globals'
import BasePage from './base.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends BasePage {
    /**
     * define selectors using getter methods
     */

    public get title () {
        return $('~title');
    }
}

export default new SecurePage();
