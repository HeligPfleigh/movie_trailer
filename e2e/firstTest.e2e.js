/* eslint no-undef: 0  */
const {execSync} = require('child_process');

const OPTIONS = {
  timeout: 10000,
  killSignal: 'SIGKILL',
};

export const takeScreenshot = name => {
  const fileName = `${name}.png`;
  if (device.getPlatform() === 'android') {
    execSync(`adb shell screencap /sdcard/${fileName}`, OPTIONS);
    execSync(
      `adb pull /sdcard/${fileName} $(pwd)/fastlane/screenshots/`,
      OPTIONS,
    );
  } else {
    execSync(
      `xcrun simctl io booted screenshot $(pwd)/fastlane/screenshots/${fileName}`,
      OPTIONS,
    );
  }
};

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should take screenshots', async () => {
    takeScreenshot('Movie');
    // await element(by.id('SETTINGS_BUTTON')).tap();
    // takeScreenshot('Settings');
  });
});
