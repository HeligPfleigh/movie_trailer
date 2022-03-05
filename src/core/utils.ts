import {IMAGE_SERVER} from './apis';
import {IGenre, IMediaOverview, IMovieOverview, ITVOverview} from './types';

export const convertMovieOverviewToMediaOverview = (
  movie: IMovieOverview,
  genres: Array<IGenre>,
): IMediaOverview => {
  const genreIds = movie.genre_ids;
  const genreNames = genreIds.map(
    id => genres.find(genre => genre.id === id)?.name,
  );
  return {
    id: movie.id,
    title: movie.title,
    poster: `${IMAGE_SERVER}${movie.poster_path}`,
    rating: movie.vote_average,
    genres: genreNames.join('/ '),
    time: movie.release_date,
  };
};

export const convertTVOverviewToMediaOverview = (
  tv: ITVOverview,
  genres: Array<IGenre>,
): IMediaOverview => {
  const genreIds = tv.genre_ids;
  const genreNames = genreIds.map(
    id => genres.find(genre => genre.id === id)?.name,
  );
  return {
    id: tv.id,
    title: tv.name,
    poster: `${IMAGE_SERVER}${tv.poster_path}`,
    rating: tv.vote_average,
    genres: genreNames.join('/ '),
    time: tv.first_air_date,
  };
};
