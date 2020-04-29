import SortingComponent from "../components/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmsContainerController from "./films-container.js";
import {INDEX_LISTS, NAVIGATION_ITEMS} from "../const.js";
import ListsContainerComponent from "../components/lists-container.js";
import NavigationComponent from "../components/navigation.js";


export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(data) {
    // Возвращает компонент "Меню (фильтры и статистика)"
    const siteMainElement = document.querySelector(`.main`);
    render(siteMainElement, new NavigationComponent(NAVIGATION_ITEMS), RenderPosition.BEFOREEND);
    render(siteMainElement, new SortingComponent(), RenderPosition.BEFOREEND);

    // Возвращает компонент  "Контейнер для всех списков фильмов"
    const listsContainerComponent = new ListsContainerComponent();
    const filmsContainerController = new FilmsContainerController(listsContainerComponent);
    render(siteMainElement, listsContainerComponent, RenderPosition.BEFOREEND);
    filmsContainerController.render(INDEX_LISTS[0], data);
    console.log(data);
  }

}
