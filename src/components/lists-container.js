import {createElement} from "../util";

const createListsContainer = () => {
  return (`<section class="films"></section>`);
};

export default class ListsContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createListsContainer();
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
