import ShowMoreButtonComponent from "../components/show-more-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import MovieController from "./movie.js";
import {INDEX_LISTS} from "../const.js";
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmsListElement, films, onDataChange, onViewChange) =>{
  return films.map((film)=>{
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
    movieController.render(film);
    return movieController;
  });
};

/*
import SortType from "../components/sort.js";

const getSorted = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};
*/

export default class FilmsListController {
  constructor(container, list, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showedFilmControllers = [];
    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;
    this._list = list;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    const films = this._filmsModel.getFilms();
    // const renderData = INDEX_LISTS[0].getData(films, sortType);

    const filmsListElement = this._container.getElement().querySelector(`.films-list__container`);

    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;
    filmsListElement.innerHTML = ``;

    const newFilms = renderFilms(filmsListElement, films.slice(0, this._showingFilmCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCount = this._showedFilmControllers.length;

    if (this._list.showMoreButton) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._showingFilmCount >= this._filmsModel.getFilms().length) {
      return;
    }
    const container = this._container.getElement();
    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const films = this._filmsModel.getFilms();
      const prevFilmsCount = this._showingFilmCount;
      this._showingFilmCount = this._showingFilmCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const dataForNewRender = films.slice(prevFilmsCount, this._showingFilmCount);
      const filmsListElement = this._container.getElement().querySelector(`.films-list__container`);
      const newFilms = renderFilms(filmsListElement, dataForNewRender, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilms(oldData.id, newData);
    if (isSuccess) {
      // this._showedFilmControllers[index].render(this._films[index]);
      this._showedFilmControllers[oldData.id].render(newData);
    }
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
