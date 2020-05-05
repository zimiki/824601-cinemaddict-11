import CommentsComponent from "../components/comments.js";
import FilmComponent from "../components/film.js";
import PopupControlsComponent from "../components/popup-controls.js";
import PopupComponent from "../components/popup-details.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const indexBody = document.querySelector(`body`);

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmComponent = null; // ВОПРОС ЭТО ВООБЩЕ НУЖНО ДЕЛАТЬ
    this._popupComponent = null;
    this._popupControlsComponent = null;
    this._commentsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);

    const onFilmCardClick = () => {
      indexBody.classList.add(`hide-overflow`);
      this._popupComponent = new PopupComponent(film);
      this._popupControlsComponent = new PopupControlsComponent(film);
      this._commentsComponent = new CommentsComponent(film.comments);

      const popupTopContainer = this._popupComponent.getElement().querySelector(`.form-details__top-container`);
      const popupBottomContainer = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
      render(popupTopContainer, this._popupControlsComponent, RenderPosition.BEFOREEND);
      render(popupBottomContainer, this._commentsComponent, RenderPosition.BEFOREEND);

      // Закрытие popup-detail
      this._popupComponent.setPopupCloseHandler(() => {
        remove(this._popupComponent);
        indexBody.classList.remove(`hide-overflow`);
      });


      render(indexBody, this._popupComponent, RenderPosition.BEFOREEND);

      this._popupComponent.setOnEcsButtonHandler(this._onEscKeyDown);

      this._popupControlsComponent.setWatchlistLabelClickHandler(()=>{
        console.log(`11`);
      });
      this._popupControlsComponent.setWatchedLabelClickHandler(()=>{
        console.log(`22`);
      });
      this._popupControlsComponent.setFavoritesLabelClickHandler(()=>{
        console.log(`33`);
      });


    };


    this._filmComponent.setFilmCardHandler(onFilmCardClick);


    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      remove(this._popupComponent);
    }
  }
}
