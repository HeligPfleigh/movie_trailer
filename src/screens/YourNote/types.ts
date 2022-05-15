import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';

export type YourNoteScreenProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.YourNote
>;

export type YourNoteRouteProps = YourNoteScreenProps['route'];
export type YourNoteNavigationProps = YourNoteScreenProps['navigation'];
