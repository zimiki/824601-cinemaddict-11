import AbstractComponent from "./abstract-component.js";

const createListsContainer = () => {
  return (`<section class="films"></section>`);
};

export default class ListsContainer extends AbstractComponent {
  getTemplate() {
    return createListsContainer();
  }
}
