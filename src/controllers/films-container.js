import CommentsComponent from "../components/comments.js";
import FilmComponent from "../components/film.js";
import FilmsListComponent from "../components/films-list.js";
import PopupControlsComponent from "../components/popup-controls.js";
import PopupComponent from "../components/popup-details.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOW_EXTRA_FILMS_COUNT = 2;
const indexBody = document.querySelector(`body`);

// 1. Функция отрисовки ОДНОГО ФИЛЬМА
const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmComponent(film);

  render(filmsListElement, filmComponent, RenderPosition.BEFOREEND);

  const onFilmCardClick = () => { // Вызов и скрытие popup-details
    indexBody.classList.add(`hide-overflow`);
    const popupComponent = new PopupComponent(film);
    const popupTopContainer = popupComponent.getElement().querySelector(`.form-details__top-container`);
    render(popupTopContainer, new PopupControlsComponent(), RenderPosition.BEFOREEND);
    const popupBottomContainer = popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(popupBottomContainer, new CommentsComponent(film.comments), RenderPosition.BEFOREEND);


    popupComponent.setPopupCloseHandler(() => {
      popupComponent.getElement().remove();
      indexBody.classList.remove(`hide-overflow`);
    });
    render(indexBody, popupComponent, RenderPosition.BEFOREEND);
  };
  filmComponent.setFilmCardHandler(onFilmCardClick);
};


// 2. Функция отрисовки ОДНОГО списка фильмов
const renderFilmList = (container, list, films) => {
  const filmListComponent = new FilmsListComponent(list);
  const filmsListElement = filmListComponent.getElement().querySelector(`.films-list__container`);
  let renderData = list.getData(films);

  if (list.showMoreButton) { // Логика showMoreButton
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    renderData = films.slice(0, showingFilmsCount);
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(filmListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        renderFilm(filmsListElement, film);
      });
      if (showingFilmsCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  } else {
    renderData = films.slice(0, SHOW_EXTRA_FILMS_COUNT);
  }
  render(container, filmListComponent, RenderPosition.BEFOREEND);
  renderData.forEach((film) => {
    renderFilm(filmsListElement, film);
  });
};


export default class FilmsContainerController {
  constructor(container) {
    this._container = container;
  }

  render(lists, data) {
    const container = this._container.getElement();
    lists.forEach((list) => {
      renderFilmList(container, list, data);
    });
  }
}
