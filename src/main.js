import {createUserProfile} from "./components/user-profile.js";
import {createMainNavigation} from "./components/navigation.js";
import {createAllFilmsLists} from "./components/index-grid-films-lists.js";
import {createFilmListElement} from "./components/film-card.js";
import {createShowMoreButton} from "./components/show-more-button.js";


const LengthFilmsList = {
  MAIN: 5,
  EXTRA: 2
};

// Функция для отрисоки элементов на странице
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Функция которая создает список фильмов в указанном месте и указанной длины
const createFilmsList = (listContainer, listLength) => {
  for (let i = 0; i < listLength; i++) {
    render(listContainer, createFilmListElement());
  }
};

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

// Возвращает компонент "Звание пользователя"
render(siteHeader, createUserProfile());

// Возвращает компонент "Меню (фильтры и статистика)"
render(siteMainElement, createMainNavigation());

// Возвращает компонент "Сетка разных списков фильмов"
render(siteMainElement, createAllFilmsLists());

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list .films-list__container`);

// Возвращает компонент "Гланый список фильмов"
createFilmsList(filmsList, LengthFilmsList.MAIN);

// Возвращает компонент "Кнопка «Show more»"
render(filmsList, createShowMoreButton(), `afterend`);

// Возвращает компонент "Дополнительные списки фильмов"
const allFilmsListsExtra = films.querySelectorAll(`.films-list--extra .films-list__container`);
allFilmsListsExtra.forEach((list) => createFilmsList(list, LengthFilmsList.EXTRA));
