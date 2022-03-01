import {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {ListMediaRouteProps} from './types';

export const useListMediaHeader = () => {
  const [header, setHeader] = useState<string>('List Media');
  const route = useRoute<ListMediaRouteProps>();
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres,
  );
  const tvGenres = useSelector((state: RootState) => state.genre.tvGenres);
  const {subroute, type, with_genres} = route.params;

  useEffect(() => {
    let mHeader = 'List Media';

    if (subroute === 'airing_today' || subroute === 'now_playing') {
      mHeader = 'Today';
    }

    if (subroute === 'upcoming') {
      mHeader = 'Upcoming';
    }

    if (subroute === 'top_rated') {
      mHeader = 'Recommendation';
    }

    if (with_genres) {
      if (type === 'movie') {
        const genre = movieGenres.find(item => item.id === with_genres);
        mHeader = genre?.name ?? mHeader;
      } else if (type === 'tv') {
        const genre = tvGenres.find(item => item.id === with_genres);
        mHeader = genre?.name ?? mHeader;
      }
    }

    setHeader(mHeader);
  }, [subroute, with_genres, tvGenres, movieGenres, type]);

  return header;
};
