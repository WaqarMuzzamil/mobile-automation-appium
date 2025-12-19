# Mobile Automation Framework with Appium & WebdriverIO

A comprehensive mobile automation testing framework for Android applications using Appium, WebdriverIO, and TypeScript. This framework demonstrates login functionality testing for the SauceLabs demo app with proper error handling and Page Object Model implementation.

## 🚀 Features

- **Page Object Model (POM)**: Clean separation of test logic and page elements
- **TypeScript Support**: Type-safe test automation
- **Comprehensive Login Testing**: Valid login, error validations for missing credentials
- **Cross-platform**: Android mobile automation
- **Detailed Reporting**: Built-in WebdriverIO reporting

## 📋 Prerequisites

Before setting up this project, ensure you have the following installed:

### Required Software:
- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Android Studio** (for Android SDK) - [Download](https://developer.android.com/studio)
- **Java JDK** (version 8 or higher) - [Download](https://adoptium.net/)

### Mobile Setup:
- **Android Device** (physical device recommended) or Android Emulator
- **USB Debugging** enabled on your Android device
- **Appium Server** (will be installed via npm)

## 🛠️ Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/WaqarMuzzamil/mobile-automation-appium.git
cd mobile-automation-appium
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Android Environment

#### Install Android SDK:
1. Open Android Studio
2. Go to **SDK Manager** (Tools → SDK Manager)
3. Install **Android SDK Platform 33** (or latest)
4. Install **Android SDK Build-Tools**
5. Set up environment variables:

**Windows:**
- Add to PATH: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`
- Add to PATH: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\tools`
- Add to PATH: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\tools\bin`

**Verify ADB installation:**
```bash
adb version
```

### Step 4: Set Up Your Android Device

#### For Physical Device:
1. Enable **Developer Options** on your Android device:
   - Go to Settings → About Phone
   - Tap **Build Number** 7 times until you see "You are now a developer"
2. Enable **USB Debugging**:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"
3. Connect your device via USB and accept the debugging prompt

#### For Emulator:
1. Open Android Studio
2. Go to **AVD Manager** (Tools → AVD Manager)
3. Create a new Virtual Device
4. Start the emulator

**Verify device connection:**
```bash
adb devices
```
You should see your device listed.

### Step 5: Configure Device Information

Update the device configuration in `wdio.conf.ts`:

```typescript
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'YOUR_DEVICE_NAME', // e.g., 'Samsung Galaxy S21'
    'appium:udid': 'YOUR_DEVICE_UDID',       // Get this from 'adb devices'
    // ... rest of configuration
}],
```

**To find your device UDID:**
```bash
adb devices -l
```

## 🧪 Running Tests

### Install Appium Globally (one-time setup):
```bash
npm install -g appium
npm install -g appium-doctor
```

### Verify Appium Installation:
```bash
appium-doctor --android
```

### Run the Tests:
```bash
npm run wdio
```

### Run Specific Test File:
```bash
npm run wdio -- --spec test/specs/login.spec.ts
```

## 📁 Project Structure

```
mobile-automation-appium/
├── app/
│   └── android/
│       └── demo-app.apk          # SauceLabs demo app APK
├── test/
│   ├── pageobjects/              # Page Object Model classes
│   │   ├── base.page.ts         # Base page with common functionality
│   │   ├── login.page.ts        # Login page elements and methods
│   │   ├── menu.page.ts         # Menu navigation
│   │   ├── logout.dialog.ts     # Logout confirmation dialog
│   │   ├── page.ts              # Base page class
│   │   └── secure.page.ts       # Products page after login
│   └── specs/
│       └── login.spec.ts        # Login test scenarios
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── wdio.conf.ts                 # WebdriverIO configuration
└── README.md                   # This file
```

## 🧪 Test Scenarios

The framework includes comprehensive login testing:

1. **Successful Login**: Valid credentials with logout verification
2. **Missing Username**: Error validation when username is empty
3. **Missing Password**: Error validation when password is empty

## 🔧 Configuration Files

### wdio.conf.ts
- WebdriverIO configuration
- Appium service setup
- Test capabilities for Android
- Mocha framework settings

### tsconfig.json
- TypeScript compiler options
- Module resolution settings
- Output directory configuration

## 🐛 Troubleshooting

### Common Issues:

**1. Device not found:**
```bash
adb kill-server
adb start-server
adb devices
```

**2. Appium server issues:**
```bash
appium-doctor --android
```

**3. Permission denied on device:**
- Ensure USB debugging is enabled
- Accept the debugging authorization prompt on device

**4. APK installation fails:**
- Check device storage space
- Ensure the APK is compatible with your Android version

### Debug Mode:
Run tests with verbose logging:
```bash
npm run wdio -- --logLevel debug
```

## 📊 Test Reports

WebdriverIO generates test reports automatically. Check the console output for detailed test results and any failures.

## 📊 Allure Reporting

This framework uses **Allure Reporter** for rich, interactive test reports with screenshots on failure.

### How it works
- After each test run, Allure results are generated automatically.
- The report opens in your browser after tests finish.
- Historical run data is preserved (unless you manually clean the results).

### How to view reports
- Run your tests:
  ```bash
  npm run wdio
  ```
  This will execute tests and auto-generate/open the Allure report.
- To manually regenerate or view the report:
  ```bash
  npm run report
  ```

### Excluding reports from Git
- The `.gitignore` file excludes `allure-results/` and `allure-report/` directories so reports are not committed.

### More info
- For advanced Allure features, see the [Allure documentation](https://docs.qameta.io/allure/).

## 🔍 Inspecting Android Apps with Appium Inspector

To inspect and interact with your Android app UI elements, use **Appium Inspector**:

### How to use Appium Inspector
1. Download Appium Inspector from the official site: [Appium Inspector Releases](https://github.com/appium/appium-inspector/releases)
2. Launch Appium Inspector on your machine.
3. Start the Appium server (it runs automatically when you execute tests with this framework).
4. In Appium Inspector, set the following desired capabilities:
   - `platformName`: Android
   - `deviceName`: Your device name (e.g., Samsung Galaxy S21)
   - `app`: Path to your APK (e.g., `app/android/demo-app.apk`)
   - `automationName`: UiAutomator2
   - `udid`: Your device UDID (for physical devices)
5. Click **Start Session** to begin inspecting your app.
6. Use the Inspector to locate element selectors (accessibility id, resource-id, xpath, etc.) for your tests.

### Tips
- Make sure your device is connected and USB debugging is enabled.
- The Appium server must be running before starting a session in Inspector.
- You can copy selectors directly from Inspector to use in your Page Object files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is for educational and testing purposes. Please ensure you have proper authorization to test any applications.

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure your Android device is properly connected
4. Check the WebdriverIO and Appium documentation

---

**Happy Testing! 🚀**