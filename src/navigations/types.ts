import {ISelfieFrameType} from '@movie_trailer/core/constants';
import {IMediaOverview, IReview} from '@movie_trailer/core/types';
import {NavigatorScreenParams} from '@react-navigation/native';
import NavigatorMap from './NavigatorMap';

export type RootDrawerParamList = {
  Home: NavigatorScreenParams<MainStackParamList>;
  [NavigatorMap.SettingNavigator]: undefined;
  Favorite: undefined;
  Search: {
    selfieMode?: ISelfieFrameType;
  };
  [NavigatorMap.YourNoteNavigator]: undefined;
};

export type MainStackParamList = {
  Overview: {
    type: 'movie' | 'tv';
  };
  Genre: {
    type: 'movie' | 'tv';
  };
  ListMedia: {
    type: 'movie' | 'tv';
    title?: string;
    url?: string;
  };
  PopularPeople: {
    title?: string;
  };
  ActorDetail: {
    id: number;
  };
  Discover: {
    type: 'movie' | 'tv';
    with_genres?: number;
  };
  MediaDetail: {
    type: 'movie' | 'tv';
    id: number;
  };
  SeasonDetail: {
    tvID: number;
    seasonNumber: number;
  };
  UserReviews: {
    id: number;
    type: 'movie' | 'tv';
    reviews: Array<IReview>;
    title: string;
    poster: string;
    time: string;
    rating: number;
    ratingAmount: number;
  };
  AddReview: {
    id: number;
    type: 'movie' | 'tv';
    title: string;
    poster: string;
    time: string;
  };
  ReviewDetail: {
    review: IReview;
  };
  [NavigatorMap.MovieSelfie]: undefined;
  [NavigatorMap.SelfieCamera]: {
    selfieMode: ISelfieFrameType;
    media: IMediaOverview;
  };
  [NavigatorMap.SelfieFrameList]: {
    title: string;
    frames: Array<ISelfieFrameType>;
  };
};

export type YourNoteStackParamList = {
  YourNote: undefined;
  ReviewDetail: {
    review: IReview;
  };
};

export type SettingStackParamList = {
  [NavigatorMap.Setting]: undefined;
  [NavigatorMap.Policy]: undefined;
};
