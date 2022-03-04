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
    subroute: 'now_playing' | 'upcoming' | 'top_rated' | 'airing_today';
  };
  PopularPeople: undefined;
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
  Favorite: undefined;
};
