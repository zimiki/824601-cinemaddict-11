import {formatTime, formatDate, createElement} from "../util.js";

const createDetailMarkup = (detail) => {
  const [title, value] = detail;
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${title}</td>
      <td class="film-details__cell">${value}</td>
    </tr>`
  );
};

const createPopupTemplate = (film) => {
  const {
    name, original, picture, rating, description, age,
    director, writers, actors, release, duration, country, genres} = film;

  const details = [
    [`Director`, director],
    [`Writers`, writers],
    [`Actors`, actors],
    [`Release Date`, formatDate(release)],
    [`Runtime`, formatTime(duration)],
    [`Country`, country],
  ];

  const delailsMarkup = details.map(createDetailMarkup).join(`\n`);
  const genresMarkup = genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(``);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${picture}" alt="${name}">
              <p class="film-details__age">${age}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${original}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating.toFixed(1)}</p>
                </div>
              </div>
              <table class="film-details__table">
                ${delailsMarkup}
                <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${genresMarkup}
                </td>
              </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
        </div>
        <div class="form-details__bottom-container"></div>
      </form>
    </section>`
  );
};

export default class Popup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }
  getTemplate() {
    return createPopupTemplate(this._film);
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
