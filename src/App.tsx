import * as React from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

import 'react-native-gesture-handler';

import {store} from './store/rootReducer';
import AppNavigator from './navigations/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// temporary comment the warning for react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
