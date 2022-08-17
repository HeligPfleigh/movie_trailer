import * as React from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';
import codePush from 'react-native-code-push';
import mobileAds from 'react-native-google-mobile-ads';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';

import 'react-native-gesture-handler';

import {persistor, store} from './store/rootReducer';
import AppNavigator from './navigations/AppNavigator';
import {VideoPlayer} from './components';
import {setAdRate} from './store/slices/adsSlice';
import Config from 'react-native-config';

// temporary comment the warning for react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log({adapterStatuses});
  });

remoteConfig()
  .setDefaults({
    interstitial_ad_rate: 1,
    open_ad_rate: 1,
  })
  .then(() => remoteConfig().fetchAndActivate())
  .then(fetchedRemotely => {
    if (fetchedRemotely) {
      console.info('Configs were retrieved from the backend and activated.');
      store.dispatch(
        setAdRate({
          interstitialAdRate: remoteConfig()
            .getValue(Config.REMOTE_CONFIG_INTERSTITIAL_AD_RATE)
            .asNumber(),
          openAdRate: remoteConfig()
            .getValue(Config.REMOTE_CONFIG_OPEN_AD_RATE)
            .asNumber(),
        }),
      );
    } else {
      console.info(
        'No configs were fetched from the backend, and the local configs were already activated',
      );
    }
  });

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ToastProvider>
            <AppNavigator />
          </ToastProvider>
        </SafeAreaProvider>

        <VideoPlayer />
      </PersistGate>
    </Provider>
  );
}

const AppWithCodePush = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
})(App);

const App$ = __DEV__ ? App : AppWithCodePush;

export default App$;
