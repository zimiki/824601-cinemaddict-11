import AbstractComponent from "./abstract-component.js";

const createFilmsList = (list) => {
  const {name, type, showHeader} = list;
  const listHeader = showHeader ? `` : `visually-hidden`;

  return (
    `<section class="${type}">
      <h2 class="films-list__title ${listHeader}">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsList extends AbstractComponent {
  constructor(list) {
    super();
    this._list = list;
  }
  getTemplate() {
    return createFilmsList(this._list);
  }
}

