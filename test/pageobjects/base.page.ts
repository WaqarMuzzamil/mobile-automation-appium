import { $ } from '@wdio/globals'
import Page from './page';
import MenuPage from './menu.page';  // Import the menu

/**
 * Base page containing common selectors and methods shared across all pages
 */
export default class BasePage extends Page {
    public menu = new MenuPage();  // Instance for easy access to menu actions

    /**
     * Common selectors using getter methods
     */
    // Add other common selectors/methods here as needed (e.g., back button, loading spinner)
}
