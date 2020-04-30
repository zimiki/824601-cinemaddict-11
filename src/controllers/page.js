import SortComponent from "../components/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsListController from "./films-list.js";
import {INDEX_LISTS} from "../const.js";
import NavigationComponent from "../components/navigation.js";
import ListsContainerComponent from "../components/lists-container.js";


export default class PageController {
  constructor(container) {
    this._container = container;
    this._navigationComponent = new NavigationComponent();
    this._sortComponent = new SortComponent();
    this._listsContainerComponent = new ListsContainerComponent();
  }

  render(data) {
    const container = this._container;
    render(container, this._navigationComponent, RenderPosition.BEFOREEND);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._listsContainerComponent, RenderPosition.BEFOREEND);

    const controllers = INDEX_LISTS.map((list)=>{
      const renderData = list.getData(data);
      const controller = new FilmsListController(this._listsContainerComponent, list);
      controller.render(renderData);
      return controller;
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const renderData = INDEX_LISTS[0].getData(data, sortType);
      controllers[0].render(renderData);
    });

  }
}
