import {Box, MovieCard} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IMovieOverview} from '@movie_trailer/core/types';
import {RootState} from '@movie_trailer/store/rootReducer';
import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import SectionHeader from './SectionHeader';

// TODO: progress of scroll

const Today: React.FC = () => {
  const movies = useSelector(
    (state: RootState) => state.movie.nowPlaying.results,
  );
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres,
  );

  const renderItem = ({item}: {item: IMovieOverview}) => {
    const itemGenres = movieGenres
      .filter(genre => item.genre_ids.includes(genre.id))
      .map(genre => genre.name);

    return (
      <Box mr={2}>
        <MovieCard
          title={item.title}
          poster={`${IMAGE_SERVER}${item.poster_path}`}
          rating={item.vote_average}
          genres={itemGenres}
        />
      </Box>
    );
  };

  return (
    <>
      <SectionHeader title="Today" />

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Today;
