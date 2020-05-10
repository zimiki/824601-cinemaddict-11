import AbstractComponent from "./abstract-component.js";

const CONTROLS_POPUP = [
  {
    name: `watchlist`,
    button: `Add to watchlist`,
  },
  {
    name: `watched`,
    button: `Already watched`,
  },
  {
    name: `favorite`,
    button: `Add to favorites`,
  },
];

const createControlMarkup = (control, film) => {
  const {name, button} = control;

  let isActive = false;

  switch (name) {
    case `watchlist`:
      isActive = film.watchlist;
      break;
    case `watched`:
      isActive = film.watched;
      break;
    case `favorite`:
      isActive = film.favorites;
      break;
  }

  const checkInput = isActive ? `checked` : ``;
  const checkControl = isActive ? `film-details__control-input:checked` : ``;

  return (
    `<input type="checkbox" ${checkInput} class="film-details__control-input visually-hidden" id="${name}" name="${name}">
     <label for="${name}" class="film-details__control-label ${checkControl} film-details__control-label--${name}">${button}</label>`
  );
};

const createPopupControlsTemplate = (film) =>{
  const controlsMarkup = CONTROLS_POPUP.map(
      (control)=>{
        return createControlMarkup(control, film);
      }
  ).join(`\n`);
  return (
    `<section class="film-details__controls">
    ${controlsMarkup}
    </section>`
  );
};

export default class PopupControls extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createPopupControlsTemplate(this._film);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
   .addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
   .addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
   .addEventListener(`click`, handler);
  }
}
