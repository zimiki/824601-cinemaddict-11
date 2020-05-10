import ShowMoreButtonComponent from "../components/show-more-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import MovieController from "./movie.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmsListElement, films, onDataChange, onViewChange) =>{
  return films.map((film)=>{
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

export default class FilmsListController {
  constructor(container, list) {
    this._container = container;
    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;
    this._list = list;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(data) {
    this._films = data;
    remove(this._showMoreButtonComponent);
    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;
    const filmsListElement = this._container.getElement().querySelector(`.films-list__container`);
    filmsListElement.innerHTML = ``;

    const newFilms = renderFilms(filmsListElement, this._films.slice(0, this._showingFilmCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._list.showMoreButton) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    if (this._showingFilmCount >= this._films.length) {
      return;
    }
    const container = this._container.getElement();
    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmCount;
      this._showingFilmCount = this._showingFilmCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const dataForNewRender = this._films.slice(prevFilmsCount, this._showingFilmCount);
      const filmsListElement = this._container.getElement().querySelector(`.films-list__container`);
      const newFilms = renderFilms(filmsListElement, dataForNewRender, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    const contollerIndex = this._showedFilmControllers.findIndex((contoller)=> contoller._film === oldData);
    if (index === -1) {
      return;
    }
    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    this._showedFilmControllers[contollerIndex].render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }
}

/*
Реализует отображение только одной формы редактирования
Для этого мы воспользуемся флагом, которым будем помечать,
какой компонент отрисовал в данный момент контроллер задачи.
И когда нам нужно будет скрыть все формы редактирования,
мы перерисуем только те компоненты, в контроллере которых
будет Mode.EDIT === true
*/
