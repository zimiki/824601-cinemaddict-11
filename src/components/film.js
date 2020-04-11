import {formatTime} from "../util.js";

const createFilmTemplate = (film) => {
  const {name, original, picture, rating, director, writers, actors, releaseDate, runTime, country, genre, description, age, comments} = film;

  return (`
    <article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating.toFixed(1)}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${formatTime(runTime)}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};
export {createFilmTemplate};
