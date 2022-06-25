import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type SearchScreenProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.Search
>;

export type SearchRouteProps = SearchScreenProps['route'];
export type SearchNavigationProps = SearchScreenProps['navigation'];
