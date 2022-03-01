import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.Overview>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type HomeNavigationProps = HomeScreenProps['navigation'];
