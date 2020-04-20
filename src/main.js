
/* import {INDEX_LISTS, NAVIGATION_ITEMS} from "./const.js";
import {cteateCommentTemplate} from "./components/comments.js";
import {createDetailsTemplate} from "./components/popup-details.js";
import FilmComponent from "./components/film.js"; // ok
import {createLists} from "./components/index-lists.js";
import {createNavigationTemplate} from "./components/navigation.js";
import {createPopupControlsTemplate} from "./components/popup-controls.js";
import {createShowMoreButton} from "./components/show-more-button.js";
import {createSortingTemplate} from "./components/sort.js";
*/
import UserProfileComponent from "./components/user-profile.js";// ok
import {generateFilms} from "./mock/film.js"; // ok
import {render, RenderPosition} from "./util.js"; // ok


const DATA_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOW_EXTRA_FILMS_COUNT = 2;
const films = generateFilms(DATA_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserProfileComponent().getElement(), RenderPosition.BEFOREEND);


/*
const siteMainElement = document.querySelector(`.main`);


--// Возвращает компонент "Звание пользователя"
--render(siteHeaderElement, createUserProfile());

// Возвращает компонент "Меню (фильтры и статистика)"
render(siteMainElement, createNavigationTemplate(NAVIGATION_ITEMS));
render(siteMainElement, createSortingTemplate());

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

// Вызов и скрытие popup-details. КЛИК ПО ПЕРВОМУ ФИЛЬМУ ОСНОВНОГО СПИСКА
const filmCard = listsContainer.querySelector(`.film-card`);
const footer = document.querySelector(`.footer`);

const onFilmCardClick = () => {
  render(footer, createDetailsTemplate(films[0]), `afterend`);
  const filmDetails = document.querySelector(`.film-details`);

  const popupTopContainer = filmDetails.querySelector(`.form-details__top-container`);
  render(popupTopContainer, createPopupControlsTemplate());

  const popupBottomContainer = filmDetails.querySelector(`.form-details__bottom-container`);
  render(popupBottomContainer, cteateCommentTemplate(films[0].comments));

  const filmDetailsClose = filmDetails.querySelector(`.film-details__close-btn`);
  filmDetailsClose.addEventListener(`click`, () => {
    filmDetails.remove();
  });
};

filmCard.addEventListener(`click`, onFilmCardClick);
*/


