import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Box, RecommendationCard} from '@movie_trailer/components';
import {RootState} from '@movie_trailer/store/rootReducer';
import SectionHeader from './SectionHeader';
import {IMovieOverview} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';

const Recommendation: React.FC = () => {
  const movies = useSelector(
    (state: RootState) => state.movie.recommandation.results,
  );
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres,
  );

  const renderItem = ({item, index}: {item: IMovieOverview; index: number}) => {
    const itemGenres = movieGenres
      .filter(genre => item.genre_ids.includes(genre.id))
      .map(genre => genre.name);

    return (
      <Box mr={index % 2 ? 0 : 1} mb={2}>
        <RecommendationCard
          title={item.title}
          poster={`${IMAGE_SERVER}${item.poster_path}`}
          rating={item.vote_average}
          genres={itemGenres}
          time={item.release_date}
        />
      </Box>
    );
  };

  return (
    <>
      <SectionHeader title="Recommendation" />

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </>
  );
};

export default Recommendation;
