import axios from 'axios';
import {IGenre, IMovieOverview, IPagination} from './types';

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
  IPagination & {results: Array<IMovieOverview>}
> => {
  const {data} = await instance.get('movie/now_playing');
  return data;
};
