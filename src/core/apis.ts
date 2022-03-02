import axios from 'axios';
import {
  IGenre,
  IMovieOverview,
  IMediaPagination,
  ITVOverview,
  IPagination,
  IPeopleOverview,
} from './types';

const API_SERVER = 'https://api.themoviedb.org/3/';
export const IMAGE_SERVER = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
  params: {
    api_key: 'd8c45b13d6456bea3bfd384f0e992ab7', // TODO: move to secret file
  },
});

export const getGenres = async (
  type: 'movie' | 'tv',
): Promise<{
  genres: Array<IGenre>;
}> => {
  const {data} = await instance.get(`genre/${type}/list`);
  return data;
};

export const getSearch = async <
  T extends IPeopleOverview | IMovieOverview | ITVOverview,
>(
  type: 'movie' | 'tv' | 'person',
  search: string,
): Promise<
  IPagination & {
    results: Array<T>;
  }
> => {
  const {data} = await instance.get(`search/${type}`, {
    params: {query: search},
  });
  return data;
};

export const getMediaOverview = async <T extends IMovieOverview | ITVOverview>(
  type: 'movie' | 'tv',
  subroute: 'top_rated' | 'upcoming' | 'airing_today' | 'now_playing',
  params?: Record<string, string | number | undefined>,
): Promise<IMediaPagination & {results: Array<T>}> => {
  const {data} = await instance.get(`${type}/${subroute}`, {params});
  return data;
};

export const getPopularPeople = async (
  params?: Record<string, string | number | undefined>,
): Promise<IPagination & {results: Array<IPeopleOverview>}> => {
  const {data} = await instance.get('person/popular', {params});
  return data;
};
