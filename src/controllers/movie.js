import CommentsComponent from "../components/popup-comments.js";
import FilmComponent from "../components/film.js";
import PopupControlsComponent from "../components/popup-controls.js";
import PopupComponent from "../components/popup-details.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

const indexBody = document.querySelector(`body`);


/*
Реализует отображение только одной формы редактирования
Для этого мы воспользуемся флагом, которым будем помечать,
какой компонент отрисовал в данный момент контроллер задачи.
И когда нам нужно будет скрыть все формы редактирования,
мы перерисуем только те компоненты, в контроллере которых
будет Mode.EDIT === true
*/

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._film = {};
    this._filmComponent = null;
    this._popupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._selectedEmoji = ``;
  }

  setFilm(film) {
    this._film = film;
  }

  _closePopup() {
    indexBody.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
  }

  // ТАКОЕ ЗАДАНИЕ Добавьте метод setDefaultView в MovieController для скрытия попапа с подробной информацией о фильме.
  setDefaultView() {
    if (this._popupComponent) {
      this._closePopup();
    }
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    this._filmComponent = new FilmComponent(this._film);

    if (oldFilmComponent) {
      replace(oldFilmComponent, this._filmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }

    this._filmComponent.setFilmCardHandler(()=>{
      this._renderPopup();
    });

    this._filmComponent.setWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const newFilm = Object.assign({}, this._film, {watchlist: !this._film.watchlist});
      this._onDataChange(this._film, newFilm);
    });

    this._filmComponent.setWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const newFilm = Object.assign({}, this._film, {watched: !this._film.watched});
      this._onDataChange(this._film, newFilm);
    });

    this._filmComponent.setFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      const newFilm = Object.assign({}, this._film, {favorites: !this._film.favorites});
      this._onDataChange(this._film, newFilm);
    });

  }

  _renderPopup() {
    this._onViewChange();
    this._popupComponent = new PopupComponent(this._film);
    this._popupControlsComponent = new PopupControlsComponent(this._film);
    this._popupCommentsComponent = new CommentsComponent(this._film);
    indexBody.classList.add(`hide-overflow`);
    const popupTopContainer = this._popupComponent.getElement().querySelector(`.form-details__top-container`);
    const popupBottomContainer = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(popupTopContainer, this._popupControlsComponent, RenderPosition.BEFOREEND);
    render(popupBottomContainer, this._popupCommentsComponent, RenderPosition.BEFOREEND);

    render(indexBody, this._popupComponent, RenderPosition.BEFOREEND);

    this._popupComponent.setOnEcsButtonHandler(this._onEscKeyDown);
    this._popupComponent.setPopupCloseHandler(() => {
      this.setDefaultView();
    });

    this._popupControlsComponent.setWatchlistClickHandler(()=>{
      const newFilm = Object.assign({}, this._film, {watchlist: !this._film.watchlist});
      this._onDataChange(this._film, newFilm);

    });
    this._popupControlsComponent.setWatchedClickHandler(()=>{
      const newFilm = Object.assign({}, this._film, {watched: !this._film.watched});
      this._onDataChange(this._film, newFilm);

    });
    this._popupControlsComponent.setFavoriteClickHandler(()=>{
      const newFilm = Object.assign({}, this._film, {favorites: !this._film.favorites});
      this._onDataChange(this._film, newFilm);
    });
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this.setDefaultView();
    }
  }

}
