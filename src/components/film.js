import {formatTime} from "../util.js";

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
  return (`
    <button class="film-card__controls-item button film-card__controls-item--${buttonClass}">${button}</button>
  `);
};

const createFilmTemplate = (film) => {
  const {name, picture, rating, release, duration, genres, description, comments} = film;
  const controlsMarkup = CONTROLS.map(createControlMarkup).join(`\n`);

  return (`
    <article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating.toFixed(1)}</p>
          <p class="film-card__info">
            <span class="film-card__year">${release.getFullYear()}</span>
            <span class="film-card__duration">${formatTime(duration)}</span>
            <span class="film-card__genre">${genres}</span>
          </p>
          <img src="./images/posters/${picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${getShortText(description, maxDescriptionSymbol)}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
          ${controlsMarkup}
          </form>
        </article>`
  );
};
export {createFilmTemplate};
