import {ISelfieFrameType} from '@movie_trailer/core/constants';

// const ShowTime = require('./show_time.png');
const Action = require('./Action.png');
const Adventure = require('./Adventure.png');
const Animation = require('./Animation.png');
const Crime = require('./Crime.png');
const Drama = require('./Drama.png');
const Family = require('./Family.png');
const Fantasy = require('./Fantasy.png');
const Fiction = require('./Fiction.png');
const History = require('./History.png');
const Music = require('./Music.png');
const Mystery = require('./Mystery.png');
const Romance = require('./Romance.png');
const ScienceFiction = require('./ScienceFiction.png');
const Thriller = require('./Thriller.png');
const TVMovies = require('./TVMovies.png');
const War = require('./War.png');
const Western = require('./Western.png');

const SelfieJellyBeanFrame = require('./SelfieJellyBeanFrame.png');
const SelfieKitKatFrame = require('./SelfieKitKatFrame.png');
const SelfieLollipopFrame = require('./SelfieLollipopFrame.png');
const SelfieMarshmallowFrame = require('./SelfieMarshmallowFrame.png');
const SelfieNougatFrame = require('./SelfieNougatFrame.png');

export const JellyBeanBg = require('./JellyBeanBg.png');
export const KitKatBg = require('./KitKatBg.png');
export const LolipopCameraFrame = require('./LolipopCameraFrame.png');
export const MarshmallowBg = require('./MarshmallowBg.png');
export const MarshmallowLargeFrame = require('./MarshmallowLargeFrame.png');
export const MarshmallowSmallFrame = require('./MarshmallowSmallFrame.png');
export const NougatBg = require('./NougatBg.png');
export const NougatCameraFrame = require('./NougatCameraFrame.png');
export const NougatShortTape = require('./NougatShortTape.png');
export const NougatLongTape = require('./NougatLongTape.png');
export const NougatPaperInfo = require('./NougatPaperInfo.png');
export const NougatNoStringTape = require('./NougatNoStringTape.png');
export const NougatPoster = require('./NougatPoster.png');

export const getThumbnailForGenre = (genre: string) => {
  switch (genre) {
    case 'Action':
      return Action;
    case 'Adventure':
    case 'Kids':
      return Adventure;
    case 'Animation':
      return Animation;
    case 'Comedy':
      return Music;
    case 'Crime':
    case 'Reality':
      return Crime;
    case 'Documentary':
    case 'History':
      return History;
    case 'Drama':
      return Drama;
    case 'Family':
      return Family;
    case 'Fantasy':
    case 'Soap':
      return Fantasy;
    case 'Horror':
      return Fiction;
    case 'Mystery':
      return Mystery;
    case 'Romance':
      return Romance;
    case 'Science Fiction':
    case 'Sci-Fi & Fantasy':
      return ScienceFiction;
    case 'Thriller':
    case 'Talk':
      return Thriller;
    case 'TV Movie':
    case 'News':
      return TVMovies;
    case 'War':
    case 'War & Politics':
      return War;
    case 'Western':
      return Western;
    default:
      return Action;
  }
};

export const getThumbnailForSelfieFrame = (type: ISelfieFrameType) => {
  switch (type) {
    case 'SelfieJellyBeanFrame':
      return SelfieJellyBeanFrame;
    case 'SelfieKitKatFrame':
      return SelfieKitKatFrame;
    case 'SelfieLollipopFrame':
      return SelfieLollipopFrame;
    case 'SelfieMarshmallowFrame':
      return SelfieMarshmallowFrame;
    case 'SelfieNougatFrame':
      return SelfieNougatFrame;
    default:
      return SelfieJellyBeanFrame;
  }
};
