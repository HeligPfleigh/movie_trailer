import {NavigatorScreenParams} from '@react-navigation/native';

export type RootDrawerParamList = {
  Home: NavigatorScreenParams<MainStackParamList>;
  Setting: undefined;
  Favorite: undefined;
  Search: undefined;
};

export type MainStackParamList = {
  Overview: {
    type: 'movie' | 'tv';
  };
  Genre: {
    type: 'movie' | 'tv';
  };
  ListMedia: {
    type: 'movie' | 'tv';
    title?: string;
    url?: string;
  };
  PopularPeople: {
    title?: string;
  };
  ActorDetail: {
    id: number;
  };
  Discover: {
    type: 'movie' | 'tv';
    with_genres?: number;
  };
  MediaDetail: {
    type: 'movie' | 'tv';
    id: number;
  };
  SeasonDetail: {
    tvID: number;
    seasonNumber: number;
  };
};
