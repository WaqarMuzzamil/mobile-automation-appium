
import { $ } from '@wdio/globals';

class LogoutDialog {

    public get logoutDialogMessage() {
        return $('//*[@resource-id="android:id/message"]');
    }

    public get logoutButton() {
        return $('//*[@resource-id="android:id/button1"]');
    }

    public get cancelButton() {
        return $('//*[@resource-id="android:id/button2"]');
    }
}

export default LogoutDialog;