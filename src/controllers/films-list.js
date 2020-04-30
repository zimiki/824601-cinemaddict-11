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


const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmComponent(film);
  render(filmsListElement, filmComponent, RenderPosition.BEFOREEND);
  const onFilmCardClick = () => { // Вызов и скрытие popup-details
    indexBody.classList.add(`hide-overflow`);
    const popupComponent = new PopupComponent(film);
    const popupTopContainer = popupComponent.getElement().querySelector(`.form-details__top-container`);
    const popupBottomContainer = popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(popupTopContainer, new PopupControlsComponent(), RenderPosition.BEFOREEND);
    render(popupBottomContainer, new CommentsComponent(film.comments), RenderPosition.BEFOREEND);


    popupComponent.setPopupCloseHandler(() => {
      popupComponent.getElement().remove();
      indexBody.classList.remove(`hide-overflow`);
    });
    render(indexBody, popupComponent, RenderPosition.BEFOREEND);
  };
  filmComponent.setFilmCardHandler(onFilmCardClick);
};


export default class FilmsListController {
  constructor(container) {
    this._container = container;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }


  render(list, data) {

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= data.length) {
        return;
      }
      render(filmListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
        data.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
          renderFilm(filmsListElement, film);
        });
        if (showingFilmsCount >= data.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const filmListComponent = new FilmsListComponent(list);
    const filmsListElement = filmListComponent.getElement().querySelector(`.films-list__container`);
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    let renderData = data.slice(0, showingFilmsCount);

    if (list.showMoreButton) {
      renderShowMoreButton();
    } else {
      renderData = data.slice(0, SHOW_EXTRA_FILMS_COUNT);
    }

    render(container, filmListComponent, RenderPosition.BEFOREEND);
    renderData.forEach((film) => {
      renderFilm(filmsListElement, film);
    });
  }
}
