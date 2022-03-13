import axios from 'axios';
import Config from 'react-native-config';

import {
  IGenre,
  IMovieOverview,
  IMediaPagination,
  ITVOverview,
  IPagination,
  IPeopleOverview,
  IActorDetail,
  ITVDetail,
  IMovieDetail,
  ISeasonDetail,
} from './types';

const API_SERVER = 'https://api.themoviedb.org/3/';
export const IMAGE_SERVER = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
  params: {
    api_key: Config.API_KEY, // TODO: move to secret file
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
  url: string,
  params?: Record<string, string | number | undefined>,
): Promise<IMediaPagination & {results: Array<T>}> => {
  const {data} = await instance.get(url, {params});
  return data;
};

export const getMediaOverviewByDiscover = async <
  T extends IMovieOverview | ITVOverview,
>(
  type: 'movie' | 'tv',
  params?: Record<string, string | number | undefined>,
): Promise<IMediaPagination & {results: Array<T>}> => {
  const {data} = await instance.get(`discover/${type}`, {params});
  return data;
};

export const getPopularPeople = async (
  params?: Record<string, string | number | undefined>,
): Promise<IPagination & {results: Array<IPeopleOverview>}> => {
  const {data} = await instance.get('person/popular', {params});
  return data;
};

export const getActorDetails = async (id: number): Promise<IActorDetail> => {
  const {data} = await instance.get(`person/${id}`, {
    params: {
      append_to_response: 'movie_credits,tv_credits,images',
    },
  });
  return data;
};

export const getHeroTVShow = async (id: number): Promise<ITVDetail> => {
  // const {
  //   data: {id},
  // } = await instance.get('tv/latest');

  // const {data} = await instance.get(`tv/${id}`, {
  //   params: {
  //     append_to_response: 'videos',
  //   },
  // });

  return getTVDetail(id);
};

export const getMovieDetail = async (id: number): Promise<IMovieDetail> => {
  const {data} = await instance.get(`movie/${id}`, {
    params: {
      append_to_response: 'videos,credits,recommendations,images',
    },
  });
  return data;
};

export const getTVDetail = async (id: number): Promise<ITVDetail> => {
  const {data} = await instance.get(`tv/${id}`, {
    params: {
      append_to_response: 'videos,credits,recommendations,images',
    },
  });
  return data;
};

export const getActorCredits = async <T extends IMovieOverview | ITVOverview>(
  url: string,
): Promise<Array<T>> => {
  const {data} = await instance.get(url);
  return [...data.cast, ...data.crew];
};

export const getSeasonDetail = async (
  tvID: number,
  seasonNumber: number,
): Promise<ISeasonDetail> => {
  const {data} = await instance.get(`tv/${tvID}/season/${seasonNumber}`);
  return data;
};
