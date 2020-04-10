import {generateLists} from "./mock/list.js";
import {generateFilms} from "./mock/film.js";
import {createUserProfile} from "./components/user-profile.js";
import {createMainNavigation} from "./components/navigation.js";
import {createLists} from "./components/index-lists.js";
// import {createShowMoreButton} from "./components/show-more-button.js";
import {createFilmTemplate} from "./components/film.js";


const FILM_COUNT = 20;
const films = generateFilms(FILM_COUNT);
const lists = generateLists(films);
// const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
// const mostCommentedFilms = films.slice().sort((a, b) => b.comments - a.comments);


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

// Возвращает компонент "Сетка разных списков фильмов"
render(siteMainElement, createLists(lists));

const listsContainers = document.querySelectorAll(`.films-list__container`);

const getRenderData = (filmList, data) => {
  return filmList.sort(data).slice(0, filmList.count);
};

/*
// Рабочий развернутый вариант
lists[0].sort(films).slice(0, lists[0].count)
  .forEach((film) => render(listsContainers[0], createFilmTemplate(film)`));

lists[1].sort(films).slice(0, lists[1].count)
  .forEach((film) => render(listsContainers[1], createFilmTemplate(film)));

lists[2].sort(films).slice(0, lists[2].count)
  .forEach((film) => render(listsContainers[2], createFilmTemplate(film)));
*/

/*
// Рабочий вариант через for
for (let i = 0; i < listsContainers.length; i++) {
  const renderData = getRenderData(lists[i], films);
  for (let j = 0; j < renderData.length; j++) {
    render(listsContainers[i], createFilmTemplate(renderData[j]));
  }
}
*/


listsContainers.forEach((container) =>
  getRenderData(lists, films).forEach((film)=>
    render(container, createFilmTemplate(film)))
);

