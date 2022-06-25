import ActorDetailScreen from '@movie_trailer/screens/ActorDetail';
import DiscoverScreen from '@movie_trailer/screens/Discover';
import FavoriteScreen from '@movie_trailer/screens/Favorite';
import GenreScreen from '@movie_trailer/screens/Genres';
import HomeScreen from '@movie_trailer/screens/Home';
import ListMediaScreen from '@movie_trailer/screens/ListMedia';
import MediaDetailScreen from '@movie_trailer/screens/MediaDetail';
import PopularPeopleScreen from '@movie_trailer/screens/PopularPeople';
import SearchScreen from '@movie_trailer/screens/Search';
import SeasonDetailScreen from '@movie_trailer/screens/SeasonDetail';
import SettingScreen from '@movie_trailer/screens/Setting';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import MovieTrailerDrawer from './MovieTrailerDrawer';
import NavigatorMap from './NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
  YourNoteStackParamList,
} from './types';
import analytics from '@react-native-firebase/analytics';
import UserReviewsScreen from '@movie_trailer/screens/UserReviews';
import AddReviewScreen from '@movie_trailer/screens/AddReview';
import YourNoteScreen from '@movie_trailer/screens/YourNote';
import ReviewDetailScreen from '@movie_trailer/screens/ReviewDetail';
import MovieSelfieScreen from '@movie_trailer/screens/MovieSelfie';
import SelfieCameraScreen from '@movie_trailer/screens/SelfieCamera';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const YourNoteStack = createNativeStackNavigator<YourNoteStackParamList>();

const linking = {
  prefixes: ['trailers://'],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      [NavigatorMap.Home]: {
        initialRouteName: NavigatorMap.Overview,
        screens: {
          [NavigatorMap.MediaDetail]: 'media/:type/:id',
        },
      },
    },
  },
};

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
      <Stack.Screen
        name={NavigatorMap.SeasonDetail}
        component={SeasonDetailScreen}
      />
      <Stack.Screen
        name={NavigatorMap.UserReviews}
        component={UserReviewsScreen}
      />
      <Stack.Screen name={NavigatorMap.AddReview} component={AddReviewScreen} />
      <Stack.Screen
        name={NavigatorMap.ReviewDetail}
        component={ReviewDetailScreen}
      />
      <Stack.Screen
        name={NavigatorMap.MovieSelfie}
        component={MovieSelfieScreen}
      />
      <Stack.Screen
        name={NavigatorMap.SelfieCamera}
        component={SelfieCameraScreen}
      />
    </Stack.Navigator>
  );
};

const YourNoteNavigator = () => (
  <YourNoteStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <YourNoteStack.Screen
      name={NavigatorMap.YourNote}
      component={YourNoteScreen}
    />
    <YourNoteStack.Screen
      name={NavigatorMap.ReviewDetail}
      component={ReviewDetailScreen}
    />
  </YourNoteStack.Navigator>
);

const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>('');

  const onNavigationReady = () => {
    if (navigationRef.current) {
      routeNameRef.current =
        navigationRef.current.getCurrentRoute()?.name ?? '';
    }
  };

  const onStateChange = async () => {
    if (!navigationRef.current) {
      return;
    }

    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;
    const currentRouteParams = navigationRef.getCurrentRoute()?.params ?? {};

    if (!currentRouteName) {
      return;
    }

    if (previousRouteName !== currentRouteName) {
      try {
        // firebase analytics
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
          ...currentRouteParams,
        });
      } catch (error) {}
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      linking={linking as any}
      ref={navigationRef}
      onReady={onNavigationReady}
      onStateChange={onStateChange}>
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
          <Drawer.Screen
            name={NavigatorMap.YourNoteNavigator}
            component={YourNoteNavigator}
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
