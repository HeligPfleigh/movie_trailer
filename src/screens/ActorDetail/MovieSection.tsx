import React from 'react';

import {
  Box,
  RecommendationCard,
  SectionHeader,
} from '@movie_trailer/components';
import {IMovieOverview} from '@movie_trailer/core/types';
import {useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import chunk from 'lodash/chunk';

interface IMovieSectionProps {
  movies: Array<IMovieOverview>;
}

const MovieSection: React.FC<IMovieSectionProps> = ({
  movies,
}: IMovieSectionProps) => {
  const genres = useSelector((state: RootState) => state.genre.movieGenres);

  const medias = chunk(
    movies.map(movie => {
      const genre = genres
        .filter(item => movie.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: movie.id,
        title: movie.title,
        genres: genre,
        poster: `${IMAGE_SERVER}${movie.poster_path}`,
        rating: movie.vote_average,
        time: movie.release_date,
      };
    }),
    2,
  );

  return (
    <>
      <SectionHeader title="Movie" />

      {medias.map(group => {
        const [firstMedia, secondMedia] = group;
        return (
          <Box mb={2} key={firstMedia.id} row>
            <Box mr={1}>
              <RecommendationCard {...firstMedia} />
            </Box>
            {secondMedia ? (
              <Box ml={1}>
                <RecommendationCard {...secondMedia} />
              </Box>
            ) : (
              <Box ml={1} />
            )}
          </Box>
        );
      })}
    </>
  );
};

export default MovieSection;