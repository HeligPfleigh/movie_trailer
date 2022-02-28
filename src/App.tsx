import * as React from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

import 'react-native-gesture-handler';

import {store} from './store/rootReducer';
import AppNavigator from './navigations/AppNavigator';

// temporary comment the warning for react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
