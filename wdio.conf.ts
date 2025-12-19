export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  specs: ['./test/specs/*.ts'], // <-- adjust to your folder
  maxInstances: 1,

  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    ['appium', {
    command: 'appium',
    args: { address: '0.0.0.0', port: 4723 }
  }]
  ],

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Samsung Galaxy S21',
      'appium:udid': '7e0795f6',
      'appium:app': `${process.cwd()}/app/android/demo-app.apk`,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 180,
      'appium:ignoreHiddenApiPolicyError': true,
      'appium:enforceXPath1': true,
      'appium:noReset': true
    }
  ],

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 60000 }
}
