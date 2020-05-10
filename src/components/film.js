import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatTime} from "../utils/common.js";

const CONTROLS = [
  {
    button: `Add to watchlist`,
    buttonClass: `add-to-watchlist`,
  },
  {
    button: `Mark as watched`,
    buttonClass: `mark-as-watched`,
  },
  {
    button: `Mark as favorite`,
    buttonClass: `favorite`,
  },
];

const maxDescriptionSymbol = 140;
const getShortText = (text, maxLength) => {
  let shortText = text;
  if (text.length > maxLength) {
    shortText = `${text.slice(0, (maxLength - 1))}...`;
  }
  return shortText;
};


const createControlMarkup = (control, film) => {
  let isActiveControl = false;
  switch (control.button) {
    case `Add to watchlist`:
      isActiveControl = film.watchlist;
      break;
    case `Mark as watched`:
      isActiveControl = film.watched;
      break;
    case `Mark as favorite`:
      isActiveControl = film.favorites;
      break;
  }
  const activeClassContol = isActiveControl ? `film-card__controls-item--active` : ``;
  const {button, buttonClass} = control;
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${buttonClass} ${activeClassContol}">${button}</button>`
  );
};

const createFilmTemplate = (film) => {
  const {name, picture, rating, release, duration, genres, description, comments} = film;
  const controlsMarkup = CONTROLS.map((control)=>{
    return createControlMarkup(control, film);
  }).join(`\n`);
  const filmDecription = getShortText(description, maxDescriptionSymbol);
  const filmYear = release.getFullYear();
  const filmRating = rating.toFixed(1);
  const filmDuration = formatTime(duration);
  const filmComments = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${filmRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmYear}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="./images/posters/${picture}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmDecription}</p>
      <a class="film-card__comments">${filmComments} comments</a>
      <form class="film-card__controls">
        ${controlsMarkup}
      </form>
      </article>`
  );
};

export default class Film extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._filmCardHandler = null;
  }
  getTemplate() {
    return createFilmTemplate(this._film);
  }


  setFilmCardHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this._filmCardHandler = handler;
  }

  subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._film.watchlist = !this._film.watchlist;
        this.rerender();
      });
    element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, () => {
        this._film.watched = !this._film.watched;
        this.rerender();
      });
    element.querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, () => {
      this._film.favorites = !this._film.favorites;
      this.rerender();
    });
  }

  recoveryListeners() {
    this.setFilmCardHandler(this._filmCardHandler);
    this.subscribeOnEvents();
  }

}
