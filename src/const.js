import {SortType} from "./components/sort";
const SHOW_EXTRA_FILMS_COUNT = 2;

const getSortedFilms = (films, sortType) => {
  const sortedFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.RATING:
      sortedFilms.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedFilms;
};


const INDEX_LISTS = [
  {
    name: `All movies. Upcoming`,
    type: `films-list`,
    showHeader: false,
    showMoreButton: true,
    getData(data, sortType) {
      return getSortedFilms(data.slice(), sortType);
    },
  },
  {
    name: `Top rated`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {
      return data.slice().sort((a, b) => b.rating - a.rating).slice(0, SHOW_EXTRA_FILMS_COUNT);
    },
  },
  {
    name: `Most commented`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {
      return data.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, SHOW_EXTRA_FILMS_COUNT);
    },
  },
];

const EMOJIIS = [`smile`, `sleeping`, `puke`, `angry`];

export {INDEX_LISTS, EMOJIIS};
