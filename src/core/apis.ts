import axios from 'axios';
import {IGenre, IMovieOverview, IMediaPagination, ITVOverview} from './types';

const API_SERVER = 'https://api.themoviedb.org/3/';
export const IMAGE_SERVER = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
  params: {
    api_key: 'd8c45b13d6456bea3bfd384f0e992ab7', // TODO: move to secret file
  },
});

export const getListMovieGenres = async (): Promise<{
  genres: Array<IGenre>;
}> => {
  const {data} = await instance.get('genre/movie/list');
  return data;
};

export const getListTVGenres = async (): Promise<{
  genres: Array<IGenre>;
}> => {
  const {data} = await instance.get('genre/tv/list');
  return data;
};

export const getNowPlayingMovies = async (): Promise<
  IMediaPagination & {results: Array<IMovieOverview>}
> => {
  const {data} = await instance.get('movie/now_playing');
  return data;
};

export const getUpcomingMovies = async (): Promise<
  IMediaPagination & {results: Array<IMovieOverview>}
> => {
  const {data} = await instance.get('movie/upcoming');
  return data;
};

export const getRecommendationMovies = async (): Promise<
  IMediaPagination & {results: Array<IMovieOverview>}
> => {
  const {data} = await instance.get('movie/top_rated');
  return data;
};

export const getAringTodayTVShows = async (): Promise<
  IMediaPagination & {results: Array<ITVOverview>}
> => {
  const {data} = await instance.get('tv/airing_today');
  return data;
};

export const getRecommendationTVShows = async (): Promise<
  IMediaPagination & {results: Array<ITVOverview>}
> => {
  const {data} = await instance.get('tv/top_rated');
  return data;
};
