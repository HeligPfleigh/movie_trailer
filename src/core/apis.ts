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

export const getSearchMulti = async (
  search: string,
): Promise<
  IPagination & {
    results: Array<
      | (IPeopleOverview & {media_type: undefined})
      | (IMovieOverview & {media_type: 'movie'})
      | (ITVOverview & {media_type: 'tv'})
    >;
  }
> => {
  const {data} = await instance.get('search/multi', {
    params: {query: search},
  });
  return data;
};

export const getSearchPeople = async (
  search: string,
): Promise<
  IPagination & {
    results: Array<IPeopleOverview>;
  }
> => {
  const {data} = await instance.get('search/person', {
    params: {query: search},
  });
  return data;
};

export const getSearchMovie = async (
  search: string,
): Promise<
  IPagination & {
    results: Array<IMovieOverview>;
  }
> => {
  const {data} = await instance.get('search/movie', {
    params: {query: search},
  });
  return data;
};

export const getSearchTV = async (
  search: string,
): Promise<
  IPagination & {
    results: Array<ITVOverview>;
  }
> => {
  const {data} = await instance.get('search/tv', {
    params: {query: search},
  });
  return data;
};
