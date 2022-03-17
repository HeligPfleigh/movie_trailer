/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Flurry from 'react-native-flurry-sdk';
import Config from 'react-native-config';

import App from './src/App';
import {name as appName} from './app.json';

new Flurry.Builder()
  .withCrashReporting(true)
  .withLogEnabled(true)
  .withLogLevel(Flurry.LogLevel.DEBUG)
  .build(Config.FLURRY_ANDROID_API_KEY, Config.FLURRY_IOS_API_KEY);

AppRegistry.registerComponent(appName, () => App);
