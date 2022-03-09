import ActorDetailScreen from '@movie_trailer/screens/ActorDetail';
import DiscoverScreen from '@movie_trailer/screens/Discover';
import FavoriteScreen from '@movie_trailer/screens/Favorite';
import GenreScreen from '@movie_trailer/screens/Genres';
import HomeScreen from '@movie_trailer/screens/Home';
import ListMediaScreen from '@movie_trailer/screens/ListMedia';
import MediaDetailScreen from '@movie_trailer/screens/MediaDetail';
import PopularPeopleScreen from '@movie_trailer/screens/PopularPeople';
import SearchScreen from '@movie_trailer/screens/Search';
import SettingScreen from '@movie_trailer/screens/Setting';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MovieTrailerDrawer from './MovieTrailerDrawer';
import NavigatorMap from './NavigatorMap';
import {MainStackParamList, RootDrawerParamList} from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigatorMap.Overview}
        component={HomeScreen}
        initialParams={{type: 'movie'}}
      />
      <Stack.Screen name={NavigatorMap.Genre} component={GenreScreen} />
      <Stack.Screen name={NavigatorMap.ListMedia} component={ListMediaScreen} />
      <Stack.Screen
        name={NavigatorMap.PopularPeople}
        component={PopularPeopleScreen}
      />
      <Stack.Screen
        name={NavigatorMap.ActorDetail}
        component={ActorDetailScreen}
      />
      <Stack.Screen name={NavigatorMap.Discover} component={DiscoverScreen} />
      <Stack.Screen
        name={NavigatorMap.MediaDetail}
        component={MediaDetailScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
        }}
        drawerContent={props => <MovieTrailerDrawer {...props} />}>
        <Drawer.Group>
          <Drawer.Screen name={NavigatorMap.Home} component={MainNavigator} />
          <Drawer.Screen
            name={NavigatorMap.Setting}
            component={SettingScreen}
          />
          <Drawer.Screen
            name={NavigatorMap.Favorite}
            component={FavoriteScreen}
          />
        </Drawer.Group>

        <Drawer.Group screenOptions={{presentation: 'modal'} as any}>
          <Drawer.Screen name={NavigatorMap.Search} component={SearchScreen} />
        </Drawer.Group>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
