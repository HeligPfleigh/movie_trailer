import {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {DiscoverRouteProps} from './types';

export const useHeader = () => {
  const [header, setHeader] = useState<string>('Discover');
  const route = useRoute<DiscoverRouteProps>();
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres,
  );
  const tvGenres = useSelector((state: RootState) => state.genre.tvGenres);
  const {type, with_genres} = route.params;

  useEffect(() => {
    let mHeader = 'Discover';

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
  }, [with_genres, tvGenres, movieGenres, type]);

  return header;
};
