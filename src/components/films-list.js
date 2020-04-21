import {createElement} from "../util";

const createFilmsList = (list) => {
  const {name, type, showHeader} = list;

  return (
    `<section class="${type}">
      <h2 class="films-list__title ${showHeader ? `` : `visually-hidden`}">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsList {
  constructor(list) {
    this._list = list;
    this._element = null;
  }
  getTemplate() {
    return createFilmsList(this._list);
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

