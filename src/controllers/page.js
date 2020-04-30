import SortComponent, {SortType} from "../components/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsListController from "./films-list.js";
import {INDEX_LISTS} from "../const.js";
import NavigationComponent from "../components/navigation.js";
import ListsContainerComponent from "../components/lists-container.js";


const getSortedFilms = (films, sortType) => {
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
  return sortedFilms;
};


export default class PageController {
  constructor(container) {
    this._container = container;
    this._navigationComponent = new NavigationComponent();
    this._sortComponent = new SortComponent();
    this._listsContainerComponent = new ListsContainerComponent();
  }

  render(data) {
    const container = this._container;
    const filmsListController = new FilmsListController(this._listsContainerComponent);
    render(container, this._navigationComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._listsContainerComponent, RenderPosition.BEFOREEND);

    INDEX_LISTS.forEach((list) => {
      const renderData = list.getData(data);
      filmsListController.render(list, renderData);
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedFilms = getSortedFilms(data, sortType);
      this._listsContainerComponent.getElement().innerHTML = ``;

      INDEX_LISTS.forEach((list) => {
        const renderData = list.getData(sortedFilms);
        filmsListController.render(list, renderData);
      });
    });
  }
}
