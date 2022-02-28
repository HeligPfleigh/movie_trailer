export type IGenre = {
  id: number;
  name: string;
};

interface IPagination {
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
}
