import CommentsComponent from "../components/popup-comments.js";
import FilmComponent from "../components/film.js";
import PopupControlsComponent from "../components/popup-controls.js";
import PopupComponent from "../components/popup-details.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const setDefaultUserComment = (film)=>{
  film.userComment.emoji = ``;
  film.userComment.comment = [];
  return film;
};
const indexBody = document.querySelector(`body`);


/*
Реализует отображение только одной формы редактирования
Для этого мы воспользуемся флагом, которым будем помечать,
какой компонент отрисовал в данный момент контроллер задачи.
И когда нам нужно будет скрыть все формы редактирования,
мы перерисуем только те компоненты, в контроллере которых
будет Mode.EDIT === true
*/

const ModePopup = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class MovieController {
  constructor(container, film, onDataChange, onViewChange) {
    this.film = film;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmComponent = new FilmComponent(film);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._popupComponent = null;
    this._modePopup = ModePopup.DEFAULT;
  }

  setFilm(film) {
    this.film = film;
  }

  _closePopup() {
    indexBody.classList.remove(`hide-overflow`);
    remove(this._popupComponent);
    setDefaultUserComment(this.film);
  }

  // ТАКОЕ ЗАДАНИЕ Добавьте метод setDefaultView в MovieController для скрытия попапа с подробной информацией о фильме.
  setDefaultView() {
    if (this._modePopup !== ModePopup.EDIT) {
      this._closePopup();
    }
  }

  render() {
    this._filmComponent.setFilmCardHandler(()=>{
      this.renderPopup();
    });
    this._filmComponent.subscribeOnEvents();
    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  renderPopup() {
    // this._onViewChange();
    // я не знаю куда поставить этот флаг

    this._popupComponent = new PopupComponent(this.film);
    this._popupControlsComponent = new PopupControlsComponent(this.film);
    this._popupCommentsComponent = new CommentsComponent(this.film);
    indexBody.classList.add(`hide-overflow`);
    const popupTopContainer = this._popupComponent.getElement().querySelector(`.form-details__top-container`);
    const popupBottomContainer = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(popupTopContainer, this._popupControlsComponent, RenderPosition.BEFOREEND);
    render(popupBottomContainer, this._popupCommentsComponent, RenderPosition.BEFOREEND);

    render(indexBody, this._popupComponent, RenderPosition.BEFOREEND);
    // this._modePopup = ModePopup.EDIT;

    this._popupComponent.setOnEcsButtonHandler(this._onEscKeyDown);
    this._popupComponent.setPopupCloseHandler(() => {
      this.setDefaultView();
    });


    this._popupCommentsComponent.setEmojiClickHandler((userCommentEmoji)=>{
      const newData = Object.assign({}, this.film, {userComment: Object.assign({}, this.film.userComment)});
      newData.userComment.emoji = userCommentEmoji;
      this._onDataChange(this, this.film, newData);
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
