import PageController from "./controllers/page.js";
import {generateFilms} from "./mock/film.js";
import ListsContainerComponent from "./components/lists-container.js";
import {render, RenderPosition} from "./utils/render.js";
import UserProfileComponent from "./components/user-profile.js";

const DATA_COUNT = 20;
const films = generateFilms(DATA_COUNT);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const listsContainerComponent = new ListsContainerComponent();


render(siteHeaderElement, new UserProfileComponent(), RenderPosition.BEFOREEND);

const pageController = new PageController(listsContainerComponent);
render(siteMainElement, listsContainerComponent, RenderPosition.BEFOREEND);
pageController.render(films);


