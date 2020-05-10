import {generateComments} from "./comments.js";

const FILMS_DATA = [
  {
    name: `The Dance of Life`,
    original: `The Dance of Life`,
    picture: `the-dance-of-life.jpg`
  },
  {
    name: `Sagebrush Trail`,
    original: `Sagebrush Trail`,
    picture: `sagebrush-trail.jpg`
  },
  {
    name: `The Man with the Golden Arm`,
    original: `The Man with the Golden Arm`,
    picture: `the-man-with-the-golden-arm.jpg`
  },
  {
    name: `Santa Claus Conquers the Martians`,
    original: `Santa Claus Conquers the Martians`,
    picture: `santa-claus-conquers-the-martians.jpg`
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    original: `Popeye the Sailor Meets Sindbad the Sailor`,
    picture: `popeye-meets-sinbad.png`
  },
  {
    name: `The Great Flamarion`,
    original: `The Great Flamarion`,
    picture: `the-great-flamarion.jpg`
  },
  {
    name: `Made for Each Other`,
    original: `Made for Each Other`,
    picture: `made-for-each-other.png`
  },
];


const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus`,
];

const GENRES = [
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Musical`,
  `Mystery`,
];


// Генерация включая min, и включая max
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
// Генерация случайного элемента из массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, (array.length - 1));
  return array[randomIndex];
};
// Генерация нового массива(случайной длины) на основе исходного
const getRandomArrayFromArray = (prototype, maxLengthNewArr) => {
  const count = getRandomIntegerNumber(1, maxLengthNewArr);
  const newArr = new Set();
  while (newArr.size < count) {
    newArr.add(getRandomArrayItem(prototype));
  }
  return Array.from(newArr);
};

// Генерация случаного имени и фамилии
const NAME = [`Anthony`, `Anne`, `Herald`, `Richard`, `Dan`, `Mary`, `Erich`, `Kate`];
const SURNAME = [`Mann`, `von Stroheim`, `Hughes`, `Weil`, `Pit`, `Brown`, `Duryea`, `Ivanov`];

const getRandHuman = () => {
  return (`${getRandomArrayItem(NAME)} ${getRandomArrayItem(SURNAME)}`);
};
const getRandomHumans = (min, max) => {
  const count = getRandomIntegerNumber(min, max);
  return Array.from({length: count}, getRandHuman).join`, `;
};

// Генерация случайной даты
const getRandomDate = (start, end) => {
  const startDate = new Date(start, 1, 1).getTime();
  const endDate = new Date(end, 1, 1).getTime();
  return new Date(getRandomIntegerNumber(startDate, endDate));
};

const generateFilm = () => {
  const randomFilm = getRandomArrayItem(FILMS_DATA);
  return {
    name: randomFilm.name,
    original: randomFilm.original,
    picture: randomFilm.picture,
    rating: getRandomIntegerNumber(10, 100) / 10,
    director: getRandHuman(),
    writers: getRandomHumans(1, 3),
    actors: getRandomHumans(3, 7),
    release: getRandomDate(1920, 2015),
    duration: getRandomIntegerNumber(60, 200),
    country: `USA`,
    genres: getRandomArrayFromArray(GENRES, 3),
    description: getRandomArrayFromArray(DESCRIPTIONS, 5).join(` `),
    age: `18`,
    comments: generateComments(2, 5),
    watchlist: Math.random() > 0.5,
    watched: Math.random() > 0.5,
    favorites: Math.random() > 0.5,
  };
};

const generateFilms = (count) => {
  return Array.from({length: count}, generateFilm);
};

export {generateFilms};
