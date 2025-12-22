# Mobile Automation Strategy

## What Types of Tests Would You Automate for This App?

The core stuff - anything that generates revenue or breaks the user experience:

- Login/logout flow - if this breaks, everything is down
- Browse products and search - people need to find what they want
- Add/remove from cart - basic functionality
- Full checkout including shipping and payment - money on the line
- Invalid credential errors and network failures - users will hit this

Also worth automating:
- Form validation - required fields, email format, payment card checks
- Cart actually stays there between sessions
- Quantity adjustments work
- Basic promo codes (if you have them)

## What Would You NOT Automate and Why?

**Pixel-perfect UI stuff** - colors, spacing, fonts, exact layouts. They're flaky as hell to test. Use manual testing or a visual regression tool instead.

**Animations** - fade-ins, scroll smoothness, modal transitions. Unless the animation IS the feature, don't test it. Timing-dependent, unreliable in CI.

**Third-party integrations** - Google Maps, analytics, social logins. You don't control these. They change independently and break your tests constantly. Manual test these.

**Weird one-off bugs** - "it crashes on Android 6 with low memory." That's a manual/investigation task. Not worth the automation overhead.

## How Would You Structure This for Multiple Platforms and Devices?

### Multiple platforms (iOS + Android)

Keep shared test logic, split the platform-specific stuff:

```
pages/
├── Base/
│   ├── base.page.ts           # common methods for both
│   └── menu.page.ts
├── iOS/
│   ├── login.page.ts          # iOS-specific interactions
│   └── products.page.ts
└── Android/
    ├── login.page.ts          # Android-specific interactions
    └── products.page.ts

specs/
├── login.spec.ts              # same test, runs on both
├── checkout.spec.ts           # shared tests
├── ios-only/
│   └── permissions.spec.ts    # iOS-only tests
└── android-only/
    └── biometric.spec.ts      # Android-only tests
```

The page objects handle the differences. Test code doesn't care which platform.

### Multiple devices

Create a config per device:

```
config/
├── devices/
│   ├── pixel4.ts              # capabilities for Pixel 4
│   ├── samsung.ts
│   ├── iphone12.ts
│   └── iphone14.ts
```

Then run against whatever device you want:

```bash
npm run wdio -- --device pixel4
npm run wdio -- --device iphone12
```

### Long-term - keep it maintainable

- One page object = one file. If it needs two reasons to change, split it.
- Page objects = locators + interactions. Nothing more.
- Test logic stays in the tests, not in page objects.
- Use method names that describe what happens, not what gets clicked.

Bad example:
```typescript
async clickProductButton() { }
async clickAddToCart() { }
```

Good example:
```typescript
async addProductToCart() { }
async proceedToCheckout() { }
```

Second one is clear what you're testing. First one is just describing clicks.

## How Would This Integrate into CI/CD?

Run tests automatically on PR and merge. Here's the basic flow:

```
Pull request → Run smoke tests → Pass? Merge approved
Merge to main → Run full suite → Send report to Slack
Nightly → Run everything on all devices
```

GitHub Actions example (not super realistic but you get the idea):

```yaml
name: Mobile Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: macos-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      
      - name: Install
        run: npm install
      
      - name: Start emulator
        run: $ANDROID_HOME/tools/emulator -avd emulator-dev &
          
      - name: Run tests
        run: npm run wdio
      
      - name: Generate Allure report
        run: npm run report
        if: always()
      
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: allure-results
          path: allure-results/
```

Key things:
- Fast smoke tests on every PR (login + checkout only)
- Full suite only on main branch (that's when you have time)
- Nightly runs test everything on all device variants
- Slack notifications when tests fail

## Biggest Risks in Mobile Automation

### Flaky tests (the nightmare)

Tests pass sometimes, fail sometimes. No real reason. Just happens.

Common culprits:
- Element takes 2 seconds to load but your wait is 1 second
- Network is slow that day
- App not in right state from previous test

Fix it:
- Use explicit waits for elements, not just `await page.element()`
- Clear app data between tests so you start fresh
- Add screenshots/logs when tests fail so you can debug later
- Isolate test data - each test creates its own data

### Device state problems

Previous test left garbage behind. App still has cached login. Something's off.

Fix it:
- Clear app data in beforeEach hook
- Maybe use different test accounts for different test suites
- Check device is actually clean before running tests

### Network dependencies

Tests fail because the API is down, not because your code is broken. False alarm.

Fix it:
- Mock the backend for critical tests (use WireMock or similar)
- Have a staging env that actually stays up
- Build tests that handle network timeouts gracefully

### Broken selectors

App updates change element IDs. XPath becomes brittle. You're constantly fixing test locators.

Fix it:
- Use accessibility IDs - they're the most stable
- Don't use complex XPath like `//android.widget.LinearLayout/android.widget.Button[3]`
- Review page objects when the app gets updated

### Tests are slow

Full suite takes 30 minutes. Nobody waits for results. Bugs aren't caught until production.

Fix it:
- Run smoke tests first (just login + checkout)
- Run full suite only on merge to main
- Use nightly builds for comprehensive testing
- Get PR feedback in under 10 minutes

### Maintenance burden

Over time tests become unreadable. Duplicated code everywhere. New people don't understand how to add tests.

Fix it:
- Keep page objects simple - one page, one file
- Don't copy-paste test code
- Document why a test exists if it's weird
- Code review test changes just like production code

### Emulator weirdness

Emulator crashes. Appium dies. Device goes offline. Random failures.

Fix it:
- Run health check before tests start
- Restart Appium server if it dies
- Use real devices for final validation when possible
- Docker containers help with consistency
