import * as React from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';
import codePush from 'react-native-code-push';

import 'react-native-gesture-handler';

import {persistor, store} from './store/rootReducer';
import AppNavigator from './navigations/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {VideoPlayer} from './components';

// temporary comment the warning for react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

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

export default AppWithCodePush;
