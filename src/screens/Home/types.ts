import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeScreenProps,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.Overview>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type HomeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, NavigatorMap.Overview>,
  DrawerNavigationProp<RootDrawerParamList, NavigatorMap.Home>
>;
