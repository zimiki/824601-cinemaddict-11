import {formatTime, formatDate} from "../util.js";

const CONTROLS = [
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

const createControlMarkup = (control) => {
  const {name, button} = control;
  return (`
  <input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}">
  <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${button}</label>
  `);
};

const createDetailMarkup = (detail) => {
  const [title, value] = detail;
  return (`
  <tr class="film-details__row">
  <td class="film-details__term">${title}</td>
  <td class="film-details__cell">${value}</td>
  </tr>
`);
};

const createDetailsTemplate = (film) => {
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
  const controlsMarkup = CONTROLS.map(createControlMarkup).join(`\n`);
  const genresMarkup = genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(``);

  return (`
    <section class="film-details">
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

          <section class="film-details__controls">
            ${controlsMarkup}
          </section>
        </div>
      </form>
    </section>`
  );
};

export {createDetailsTemplate};
