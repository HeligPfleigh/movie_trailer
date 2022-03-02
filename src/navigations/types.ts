export type RootDrawerParamList = {
  Home: undefined;
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
    with_genres?: number;
  };
  PopularPeople: undefined;
};
