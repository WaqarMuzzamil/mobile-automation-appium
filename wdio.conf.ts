import { envConfig as devConfig } from './test/config/env.dev';
import { envConfig as stagingConfig } from './test/config/env.staging';
import { envConfig as prodConfig } from './test/config/env.prod';

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
      'appium:deviceName': secrets.deviceName,
      'appium:udid': secrets.udid,
      'appium:app': envConfig.appPath,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 180,
      'appium:ignoreHiddenApiPolicyError': true,
      'appium:enforceXPath1': true,
      'appium:noReset': true
    }
  ],

  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
  mochaOpts: { ui: 'bdd', timeout: 60000 },

  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      await browser.allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  }
}
