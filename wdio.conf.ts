
import { envConfig as devConfig } from './test/config/env.dev';

import { secrets as devSecrets } from './test/config/dev.secrets';
import { secrets as stagingSecrets } from './test/config/staging.secrets';
import { secrets as prodSecrets } from './test/config/prod.secrets';

const ENV = process.env.ENV || 'dev';
let envConfig, secrets;
if (ENV === 'dev') {
  envConfig = devConfig;
  secrets = devSecrets;
} else if (ENV === 'staging') {
  console.log(`Environment 'staging' is currently not implemented.`);
  secrets = stagingSecrets;
  process.exit(1);
} else if (ENV === 'prod') {
  console.log(`Environment 'prod' is currently not implemented.`);
  secrets = prodSecrets;
  process.exit(1);
} else {
  envConfig = devConfig;
  secrets = devSecrets;
}

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  specs: ['./test/specs/*.ts'],
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
      'appium:deviceName': secrets.deviceName,
      'appium:udid': secrets.udid,
      'appium:app': envConfig.appPath,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 180,
      'appium:ignoreHiddenApiPolicyError': true,
      'appium:noReset': true
    }
  ],

  framework: 'mocha',
  reporters: ['spec', ['allure', {
    outputDir: './allure-results',
    disableWebsockets: true
  }]],
  mochaOpts: { 
    ui: 'bdd', 
    timeout: 600000
  },

  afterTest: async function(_test, _context, { error: _error, result: _result, duration: _duration, passed, retries: _retries }) {
    if (!passed) {
      try {
        const screenshot = await browser.takeScreenshot();
        // Save screenshot locally - wdio-html-reporter will handle it automatically
        await require('fs').promises.writeFile(
          `./html-reports/screenshots/${Date.now()}.png`,
          Buffer.from(screenshot, 'base64')
        );
      } catch (e) {
        console.log('Screenshot capture failed:', e);
      }
    }
  }
}
