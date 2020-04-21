
import {INDEX_LISTS, NAVIGATION_ITEMS} from "./const.js";
import {render, RenderPosition} from "./util.js";

import PopupControlsComponent from "./components/popup-controls.js";
import PopupComponent from "./components/popup-details.js";

import ShowMoreButtonComponent from "./components/show-more-button.js";

import FilmComponent from "./components/film.js";
import FilmsListComponent from "./components/films-list.js";
import ListsContainerComponent from "./components/lists-container.js";

import CommentsComponent from "./components/comments.js";
import SortingComponent from "./components/sort.js";
import NavigationComponent from "./components/navigation.js";
import UserProfileComponent from "./components/user-profile.js";
import {generateFilms} from "./mock/film.js";


const DATA_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOW_EXTRA_FILMS_COUNT = 2;

// 1. Функция отрисовки ОДНОГО ФИЛЬМА
const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmComponent(film);
  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
  const filmCard = filmComponent.getElement().querySelector(`.film-card__poster`);


  // Вызов и скрытие popup-details
  const footer = document.querySelector(`.footer`);

  const onFilmCardClick = () => {
    console.log(film);

    /*
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
*/
  };
  filmCard.addEventListener(`click`, onFilmCardClick);

};


// 2. Функция отрисовки ОДНОГО списка фильмов
const renderFilmList = (container, list, films) => {
  const filmListComponent = new FilmsListComponent(list);
  render(container, filmListComponent.getElement(), RenderPosition.BEFOREEND);
  const filmsListElement = filmListComponent.getElement().querySelector(`.films-list__container`);
  let renderData = list.getData(films);

  // Логика showMoreButton
  if (list.showMoreButton) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    renderData = films.slice(0, showingFilmsCount);

    const showMoreButton = new ShowMoreButtonComponent().getElement();
    render(filmListComponent.getElement(), showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.addEventListener(`click`, () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        renderFilm(filmsListElement, film);
      });
      if (showingFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  } else {
    renderData = films.slice(0, SHOW_EXTRA_FILMS_COUNT);
  }

  renderData.forEach((film) => {
    renderFilm(filmsListElement, film);
  });
};


// 3. Функция отрисовки КОНТЕЙНАРА со всеми списками фильмов
const renderAllLists = (containerComponent, lists, data) => {
  lists.forEach((list) => {
    renderFilmList(containerComponent.getElement(), list, data);
  });
};


//      -- ОТРИСОВКА ---

// Данные
const films = generateFilms(DATA_COUNT);

// Возвращает компонент "Звание пользователя"
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserProfileComponent().getElement(), RenderPosition.BEFOREEND);

// Возвращает компонент "Меню (фильтры и статистика)"
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new NavigationComponent(NAVIGATION_ITEMS).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

// Возвращает компонент  "Контейнер для всех списков фильмов"
const listsContainerComponent = new ListsContainerComponent();
render(siteMainElement, listsContainerComponent.getElement(), RenderPosition.BEFOREEND);
renderAllLists(listsContainerComponent, INDEX_LISTS, films);


/*
-
-
-
-

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

-
-
-
-
-
-
-
-
-
-
-

-

--render(siteHeaderElement, createUserProfile());
--render(siteMainElement, createNavigationTemplate(NAVIGATION_ITEMS));
--render(siteMainElement, createSortingTemplate());


render(siteMainElement, createLists(INDEX_LISTS));
const listsContainer = document.querySelector(`.films`);


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


