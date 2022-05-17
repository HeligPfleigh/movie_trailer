import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  RootDrawerParamList,
  YourNoteStackParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type YourNoteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<YourNoteStackParamList, NavigatorMap.YourNote>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.YourNoteNavigator>
>;

export type YourNoteRouteProps = YourNoteScreenProps['route'];
export type YourNoteNavigationProps = YourNoteScreenProps['navigation'];
