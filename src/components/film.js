import {formatTime, createElement} from "../util.js";

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

const createControlMarkup = (control) => {
  const {button, buttonClass} = control;
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${buttonClass}">${button}</button>`
  );
};

const createFilmTemplate = (film) => {
  const {name, picture, rating, release, duration, genres, description, comments} = film;
  const controlsMarkup = CONTROLS.map(createControlMarkup).join(`\n`);

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

export default class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }
  getTemplate() {
    return createFilmTemplate(this._film);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
