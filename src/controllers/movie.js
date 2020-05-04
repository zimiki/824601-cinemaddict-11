import CommentsComponent from "../components/comments.js";
import FilmComponent from "../components/film.js";
import PopupControlsComponent from "../components/popup-controls.js";
import PopupComponent from "../components/popup-details.js";
import {render, RenderPosition} from "../utils/render.js";

const indexBody = document.querySelector(`body`);

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmComponent = null;
    // this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);

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
    this._filmComponent.setFilmCardHandler(onFilmCardClick);

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);

  }
}
