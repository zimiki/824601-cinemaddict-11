const FILMS_DATA = [
  {
    name: `The Dance of Life`,
    ogiginal: `The Dance of Life`,
    picture: `the-dance-of-life.jpg`
  },
  {
    name: `Sagebrush Trail`,
    ogiginal: `Sagebrush Trail`,
    picture: `sagebrush-trail.jpg`
  },
  {
    name: `The Man with the Golden Arm`,
    ogiginal: `The Man with the Golden Arm`,
    picture: `the-man-with-the-golden-arm.jpg`
  },
  {
    name: `Santa Claus Conquers the Martians`,
    ogiginal: `Santa Claus Conquers the Martians`,
    picture: `santa-claus-conquers-the-martians.jpg`
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    ogiginal: `Popeye the Sailor Meets Sindbad the Sailor`,
    picture: `popeye-meets-sinbad.png`
  },
  {
    name: `The Great Flamarion`,
    ogiginal: `The Great Flamarion`,
    picture: `the-great-flamarion.jpg`
  },
  {
    name: `Made for Each Other`,
    ogiginal: `Made for Each Other`,
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


const NAME = [`Anthony`, `Anne`, `Herald`, `Richard`, `Dan`, `Mary`, `Erich`];
const SURNAME = [`Mann`, `von Stroheim`, `Hughes`, `Weil`, `Pit`, `Brown`, `Duryea`];
const getRandHuman = () => {
  return (`${getRandomArrayItem(NAME)} ${getRandomArrayItem(SURNAME)}`);

};


// Генерация включая min, и включая max
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Генерация случайного элемента из массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, (array.length - 1));
  return array[randomIndex];
};


// Генерация нового массива случаной длины и неповторяющегося содержания
const getNewDescription = (arr, max) => {
  const newArr = [];
  const newArrLength = getRandomIntegerNumber(1, max);
  while (newArr.length < newArrLength) {
    let element = getRandomArrayItem(arr);
    if (newArr.indexOf(element) === -1) {
      newArr.push(element);
    }
  }
  const newDescription = newArr.join(` `);
  return newDescription;
};


const generateFilm = () => {
  const randFilm = getRandomArrayItem(FILMS_DATA);
  return {
    name: randFilm.name,
    ogiginal: randFilm.original,
    picture: randFilm.picture,
    rating: getRandomIntegerNumber(10, 100) / 10,
    director: getRandHuman(),
    writers: getRandHuman(),
    actors: getRandHuman(),
    releaseDate: getRandomIntegerNumber(1950, 1985), // поправить
    runTime: getRandomIntegerNumber(60, 200),
    country: `USA`,
    genre: getRandomArrayItem(GENRES),
    description: getNewDescription(DESCRIPTIONS, 5),
    age: `18`,
    comments: getRandomIntegerNumber(1, 465), //* * Обратите внимание, комментарии — это отдельная структура данных с эмоцией, датой, автором и сообщением, а не просто массив строк в структуре фильма
    watchList: Math.random() > 0.5,
    alreadyWatched: Math.random() > 0.5,
    favorites: Math.random() > 0.5,
  };
};

const generateFilms = (count) => {
  return Array.from({length: count}, generateFilm);
};

export {generateFilms};
