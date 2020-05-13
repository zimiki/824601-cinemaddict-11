const EMOJIIS = [`smile`, `sleeping`, `puke`, `angry`];

// Генерация включая min, и включая max
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
// Генерация случайного элемента из массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, (array.length - 1));
  return array[randomIndex];
};
// Генерация случайной даты
const getRandomDate = (start, end) => {
  const startDate = new Date(start, 1, 1).getTime();
  const endDate = new Date(end, 1, 1).getTime();
  return new Date(getRandomIntegerNumber(startDate, endDate));
};


const COMMENTS = [
  `Interesting setting and a good cas`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const AUTORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Ann Jonson`,
  `Kate Midolton`,
  `Alex Sigal`,
  `Jeny Stark`,
];

const generateComment = () => {
  return {
    text: getRandomArrayItem(COMMENTS),
    autor: getRandomArrayItem(AUTORS),
    data: getRandomDate(2018, 2020),
    emoji: getRandomArrayItem(EMOJIIS),
  };
};

const generateComments = (min, max) => {
  const count = getRandomIntegerNumber(min, max);
  return Array.from({length: count}, generateComment);
};

export {generateComments};
