import { $ } from '@wdio/globals';
import LogoutDialog from '../LogIn/logout.dialog';


class MenuPage {

    public get viewMenu() {
        return $('~View menu');
    }

    public logoutDialog = new LogoutDialog();

    public get webView() {
        return $('//android.widget.TextView[@text="WebView"]');
    }

    public get catalog() {
        return $('android=new UiSelector().text("Catalog")');
    }

    public get qrCodeScanner() {
        return $('//android.widget.TextView[@text="QR Code Scanner"]');
    }

    public get geoLocation() {
        return $('//android.widget.TextView[@text="Geo Location"]');
    }

    public get drawing() {
        return $('//android.widget.TextView[@text="Drawing"]');
    }

    public get about() {
        return $('//android.widget.TextView[@text="About"]');
    }

    public get resetAppState() {
        return $('//android.widget.TextView[@text="Reset App State"]');
    }

    public get fingerPrint() {
        return $('//android.widget.TextView[@text="FingerPrint"]');
    }

    public get virtualUsb() {
        return $('//android.widget.TextView[@text="Virtual USB"]');
    }

    public get loginMenuItem() {
        return $('~Login Menu Item');
    }

    public get logoutMenuItem() {
        return $('~Logout Menu Item');
    }

    public async open() {
        await this.viewMenu.click();
    }

    public async selectWebView() {
        await this.open();
        await this.webView.click();
    }

    public async selectQrCodeScanner() {
        await this.open();
        await this.qrCodeScanner.click();
    }

    public async selectGeoLocation() {
        await this.open();
        await this.geoLocation.click();
    }

    public async selectDrawing() {
        await this.open();
        await this.drawing.click();
    }

    public async selectAbout() {
        await this.open();
        await this.about.click();
    }

    public async selectResetAppState() {
        await this.open();
        await this.resetAppState.click();
    }

    public async selectFingerPrint() {
        await this.open();
        await this.fingerPrint.click();
    }

    public async selectVirtualUsb() {
        await this.open();
        await this.virtualUsb.click();
    }

    public async selectLoginMenuItem() {
        await this.open();
        await this.loginMenuItem.click();
    }

    public async openCatalog() {
        await this.open();
        await this.catalog.click();
    }

    public async logout() {
        await this.open();
        await this.logoutMenuItem.click();
        await expect(this.logoutDialog.logoutDialogMessage).toBeExisting();
        await expect(this.logoutDialog.logoutDialogMessage).toHaveText('Are you sure you want to logout');
        await this.logoutDialog.logoutButton.click();
    }
}

export default new MenuPage();