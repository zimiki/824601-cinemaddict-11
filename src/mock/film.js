const FILMS_TITLE = [
  {
    name: `The Dance of Life`,
    picture: `the-dance-of-life.jpg`
  },
  {
    name: `Sagebrush Trail`,
    picture: `sagebrush-trail.jpg`
  },
  {
    name: `The Man with the Golden Arm`,
    picture: `the-man-with-the-golden-arm.jpg`
  },
  {
    name: `Santa Claus Conquers the Martians`,
    picture: `santa-claus-conquers-the-martians.jpg`
  },
  {
    name: `Popeye the Sailor Meets Sindbad the Sailor`,
    picture: `popeye-meets-sinbad.png`
  },
  {
    name: `The Great Flamarion`,
    picture: `the-great-flamarion.jpg`
  },
  {
    name: `Made for Each Other`,
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

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, (array.length - 1));
  return array[randomIndex];
};


const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILMS_TITLE),
    rating: getRandomIntegerNumber(10, 100) / 10,
    year: getRandomIntegerNumber(1950, 1985),
    duration: getRandomIntegerNumber(60, 200),
    genre: getRandomArrayItem(GENRES),
    description: getRandomArrayItem(DESCRIPTIONS),
    comments: getRandomIntegerNumber(1, 465), //* * Обратите внимание, комментарии — это отдельная структура данных с эмоцией, датой, автором и сообщением, а не просто массив строк в структуре фильма
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};
