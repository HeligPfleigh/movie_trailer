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
  first_air_date?: string; // tv only
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

export interface IActorDetail {
  adult: boolean;
  also_known_as: Array<string>;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  movie_credits: {
    cast: Array<IMovieOverview>;
    crew: Array<unknown>;
  };
  tv_credits: {
    cast: Array<ITVOverview>;
    crew: Array<unknown>;
  };
  images: {
    profiles: Array<IImage>;
  };
}

export interface IVideo {
  name: string;
  key: string;
  site: 'YouTube' | 'Vimeo' | string;
  size: number;
  id: string;
}

export interface IImage {
  aspect_ratio: number;
  height: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ISeasonOverview {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  id: string;
  images?: Array<string>; // optional for personal reviews
}

export interface ITVDetail extends Omit<ITVOverview, 'genre_ids' | 'video'> {
  videos: {
    results: Array<IVideo>;
  };
  genres: Array<IGenre>;
  credits: {
    cast: Array<Omit<IPeopleOverview, 'known_for'>>;
    crew: Array<Omit<IPeopleOverview, 'known_for'>>;
  };
  recommendations: IMediaPagination & {results: Array<ITVOverview>};
  images: {
    backdrops: Array<IImage>;
    posters: Array<IImage>;
    logos: Array<IImage>;
  };
  seasons: Array<ISeasonOverview>;
  homepage: string | null;
  reviews: IPagination & {
    results: Array<IReview>;
  };
}

export interface IMovieDetail
  extends Omit<IMovieOverview, 'genre_ids' | 'video'> {
  videos: {
    results: Array<IVideo>;
  };
  genres: Array<IGenre>;
  runtime: number;
  credits: {
    cast: Array<Omit<IPeopleOverview, 'known_for'>>;
    crew: Array<Omit<IPeopleOverview, 'known_for'>>;
  };
  recommendations: IMediaPagination & {results: Array<IMovieOverview>};
  images: {
    backdrops: Array<IImage>;
    posters: Array<IImage>;
    logos: Array<IImage>;
  };
  homepage: string | null;
  reviews: IPagination & {
    results: Array<IReview>;
  };
}

export interface IEpisodeOverview {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Array<unknown>;
  guest_stars: Array<unknown>;
}
export interface ISeasonDetail extends Omit<ISeasonOverview, 'episode_count'> {
  episodes: Array<IEpisodeOverview>;
}
