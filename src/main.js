import PageController from "./controllers/page.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import UserProfileComponent from "./components/user-profile.js";

const DATA_COUNT = 20;
const films = generateFilms(DATA_COUNT);

// Возвращает компонент "Звание пользователя"
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserProfileComponent(), RenderPosition.BEFOREEND);

const pageController = new PageController();
pageController.render(films);
