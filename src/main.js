import {INDEX_LISTS, NAVIGATION_ITEMS} from "./const.js";
import FilmsContainerController from "./controllers/films-container.js";
import NavigationComponent from "./components/navigation.js";
import SortingComponent from "./components/sort.js";
import UserProfileComponent from "./components/user-profile.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import ListsContainerComponent from "./components/lists-container.js";

const DATA_COUNT = 20;

//  -- ОТРИСОВКА ---
const films = generateFilms(DATA_COUNT);
console.log(films);

// Возвращает компонент "Звание пользователя"
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserProfileComponent(), RenderPosition.BEFOREEND);

// Возвращает компонент "Меню (фильтры и статистика)"
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new NavigationComponent(NAVIGATION_ITEMS), RenderPosition.BEFOREEND);
render(siteMainElement, new SortingComponent(), RenderPosition.BEFOREEND);

// Возвращает компонент  "Контейнер для всех списков фильмов"
const listsContainerComponent = new ListsContainerComponent();
const filmsContainerController = new FilmsContainerController(listsContainerComponent);

render(siteMainElement, listsContainerComponent, RenderPosition.BEFOREEND);
filmsContainerController.render(INDEX_LISTS, films);
