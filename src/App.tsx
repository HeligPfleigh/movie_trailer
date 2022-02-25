import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import 'react-native-gesture-handler';

import HomeScreen from './screens/Home';
import MovieTrailerDrawer from './navigations/MovieTrailerDrawer';
import {RootDrawerParamList} from './navigations/types';
import NavigatorMap from './navigations/NavigatorMap';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <MovieTrailerDrawer {...props} />}>
        <Drawer.Screen name={NavigatorMap.Home} component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
