import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  // Его задача — восстанавливать обработчики событий после перерисовки;
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }
}
