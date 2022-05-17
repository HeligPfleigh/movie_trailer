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
