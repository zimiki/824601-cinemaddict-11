import SortComponent from "../components/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsListController from "./films-list.js";
import {INDEX_LISTS} from "../const.js";
import NavigationComponent from "../components/navigation.js";
import ListsContainerComponent from "../components/lists-container.js";
import FilmsListComponent from "../components/films-list.js";


export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._navigationComponent = new NavigationComponent();
    this._sortComponent = new SortComponent();
    this._listsContainerComponent = new ListsContainerComponent();
  }

  render() {
    const container = this._container;
    render(container, this._navigationComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._listsContainerComponent, RenderPosition.BEFOREEND);

    const controllers = INDEX_LISTS.map((list) => {
      // const renderData = list.getData(data);
      const filmListComponent = new FilmsListComponent(list);
      render(this._listsContainerComponent.getElement(), filmListComponent, RenderPosition.BEFOREEND);
      const controller = new FilmsListController(filmListComponent, list, this._filmsModel);
      // controller.render(renderData);
      controller.render();
      return controller;
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const renderData = INDEX_LISTS[0].getData(data, sortType);
      controllers[0].render(renderData);
    });

  }
}
