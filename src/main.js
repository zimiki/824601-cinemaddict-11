import {INDEX_LISTS} from "./const.js";
import {createFilmTemplate} from "./components/film.js";
import {createLists} from "./components/index-lists.js";
import {createMainNavigation} from "./components/navigation.js";
import {createShowMoreButton} from "./components/show-more-button.js";
import {createUserProfile} from "./components/user-profile.js";
import {generateFilms} from "./mock/film.js";

const DATA_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOW_EXTRA_FILMS_COUNT = 2;
const films = generateFilms(DATA_COUNT);

// Функция для отрисоки элементов на странице
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

// Возвращает компонент "Звание пользователя"
render(siteHeader, createUserProfile());

// Возвращает компонент "Меню (фильтры и статистика)"
render(siteMainElement, createMainNavigation());

// Возвращает компонент "Все списки фильмов"
render(siteMainElement, createLists(INDEX_LISTS));
const listsContainer = document.querySelector(`.films`);


// Список со всеми фильмами
const allFilmsContainer = listsContainer.querySelector(`.films-list .films-list__container`);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount)
  .forEach((film) => render(allFilmsContainer, createFilmTemplate(film)));

// Кнопка "Показать еще" для списка с основынми фильмами
render(allFilmsContainer, createShowMoreButton(), `afterend`);
const showMoreButton = listsContainer.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(allFilmsContainer, createFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

// Списки с отсортированными фильмами
const [topRatedContainer, mostCommentedContainer] = listsContainer.querySelectorAll(`.films-list--extra .films-list__container`);

const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
topRatedFilms.slice(0, SHOW_EXTRA_FILMS_COUNT)
  .forEach((film) => render(topRatedContainer, createFilmTemplate(film)));

const mostCommentedFilms = films.slice().sort((a, b) => b.comments - a.comments);
mostCommentedFilms.slice(0, SHOW_EXTRA_FILMS_COUNT)
  .forEach((film) => render(mostCommentedContainer, createFilmTemplate(film)));
