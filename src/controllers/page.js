import SortComponent from "../components/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsListController from "./films-list.js";
import {INDEX_LISTS, NAVIGATION_ITEMS} from "../const.js";
import NavigationComponent from "../components/navigation.js";


export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._navigationComponent = new NavigationComponent(NAVIGATION_ITEMS);
  }

  render(data) {
    const container = this._container;
    const siteMainElement = document.querySelector(`.main`);
    const filmsListController = new FilmsListController(container);

    render(siteMainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, this._navigationComponent, RenderPosition.AFTERBEGIN);

    INDEX_LISTS.forEach((list) => {
      filmsListController.render(list, data);
    });
    console.log(data);
  }

}

/*
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
*/
