import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

import 'react-native-gesture-handler';

import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import MovieTrailerDrawer from './navigations/MovieTrailerDrawer';
import {RootDrawerParamList} from './navigations/types';
import NavigatorMap from './navigations/NavigatorMap';
import {store} from './store/rootReducer';
import SettingScreen from './screens/Setting';
import GenreScreen from './screens/Genres';

// temporary comment the warning for react-native-gesture-handler
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <MovieTrailerDrawer {...props} />}>
          <Drawer.Group>
            <Drawer.Screen name={NavigatorMap.Home} component={HomeScreen} />
            <Drawer.Screen
              name={NavigatorMap.Setting}
              component={SettingScreen}
            />
            <Drawer.Screen name={NavigatorMap.Genre} component={GenreScreen} />
          </Drawer.Group>

          <Drawer.Group screenOptions={{presentation: 'modal'} as any}>
            <Drawer.Screen
              name={NavigatorMap.Search}
              component={SearchScreen}
            />
          </Drawer.Group>
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
