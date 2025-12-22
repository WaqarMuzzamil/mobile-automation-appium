# Mobile Automation Framework

WebdriverIO + Appium framework for testing Android apps.

## Setup

### Prerequisites
- Node.js v20.9.0
- Android SDK 
- Java JDK 25.0.1
- Appium 2.19.0

### Installation
```bash
npm install
```

### Device Setup
1. Enable USB debugging on your Android device
2. Connect device via USB
3. Verify connection:
   ```bash
   adb devices
   ```

### Configuration
Update `test/config/dev.secrets.ts` with your test credentials:
```typescript
export const secrets = {
  username: 'test@example.com',
  password: 'password',
  deviceName: 'emulator-5554',
  udid: 'emulator-5554'
};
```

## Running Tests

```bash
# Run all tests
npm run wdio

# Run specific spec
npm run wdio -- --spec test/specs/login.spec.ts

# View Allure report
npm run report
```

## Project Structure

```
test/
├── config/          # Configuration and secrets
├── pages/           # Page Object classes
│   ├── Base/
│   ├── LogIn/
│   ├── Produts/
│   ├── Cart/
│   └── Checkout/
├── models/          # Data models
└── specs/           # Test files
```

## Page Objects

- **BasePage**: Common functionality for all pages
- **MenuPage**: Menu navigation
- **LoginPage**: Login form
- **ProductsPage**: Product listing
- **CartPage**: Shopping cart
- **CheckoutPage**: Order review

## Test Scenarios

- Login with valid credentials
- Login error validation
- Add products to cart
- Complete checkout with shipping and payment

## Reporting

Tests generate Allure reports. Run `npm run report` to view results.

## Troubleshooting

**Device not found:**
```bash
adb kill-server
adb start-server
```

**Appium issues:**
```bash
appium-doctor --android
```

**Element not found:**
Use Appium Inspector to find element locators.
