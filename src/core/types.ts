export type IGenre = {
  id: number;
  name: string;
};

export interface IPagination {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMediaPagination extends IPagination {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface IMovieOverview {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITVOverview {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IMediaOverview {
  id: number;
  title: string;
  poster: string;
  rating: number;
  genres: string;
  time: string;
  favorite?: boolean;
}

export interface IPeopleOverview {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Array<
    | (IMovieOverview & {media_type: 'movie'})
    | (ITVOverview & {media_type: 'tv'})
  >;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface IActorOverview {
  id: number;
  name: string;
  thumbnail: string;
  department: string;
  favorite?: boolean;
}
