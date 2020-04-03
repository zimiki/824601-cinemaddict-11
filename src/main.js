"use strict";

const LengthFilmsList = {
  MAIN: 5,
  EXTRA: 2
};

// 1. Звание пользователя;
const createUserProfile = () => {
  return (`
  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

// 2. Меню (фильтры и статистика);
const createFilmListElement = () => {
  return (`
    <article class="film-card">
          <h3 class="film-card__title">The Dance of Life</h3>
          <p class="film-card__rating">8.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

// 3. Карточка фильма;
const createMainNavigation = () => {
  return (`
    <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


// 4. Кнопка «Show more»;
const createButtonShowMore = () => {
  return (`
  <button class="films-list__show-more">Show more</button>`
  );
};


// 5. Сетка списков фильмов
const createAllFilmsLists = () => {
  return (`
  <section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>
  </section>`
  );
};

// Функция для отрисоки элементов на странице
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Функция которая создает список фильмов в указанном месте и указанной длины
const createFilmsList = (listContainer, listLength) => {
  for (let i = 0; i < listLength; i++) {
    render(listContainer, createFilmListElement(), `beforeend`);
  }
};

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

// Возвращает компонент "Звание пользователя"
render(siteHeader, createUserProfile(), `beforeend`);

// Возвращает компонент "Меню (фильтры и статистика)"
render(siteMainElement, createMainNavigation(), `beforeend`);

// Возвращает компонент "Сетка разных списков фильмов"
render(siteMainElement, createAllFilmsLists(), `beforeend`);

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list .films-list__container`);

// Возвращает компонент "Гланый список фильмов"
createFilmsList(filmsList, LengthFilmsList.MAIN);

// Возвращает компонент "Кнопка «Show more»"
render(filmsList, createButtonShowMore(), `afterend`);

// Возвращает компонент "Дополнительные списки фильмов"
const allFilmsListsExtra = films.querySelectorAll(`.films-list--extra .films-list__container`);
allFilmsListsExtra.forEach((list) => createFilmsList(list, LengthFilmsList.EXTRA));
