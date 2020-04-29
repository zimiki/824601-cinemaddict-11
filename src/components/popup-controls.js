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

const createControlMarkup = (control) => {
  const {name, button} = control;
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}">
     <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${button}</label>`
  );
};

const createPopupControlsTemplate = () =>{
  const controlsMarkup = CONTROLS_POPUP.map(createControlMarkup).join(`\n`);
  return (
    `<section class="film-details__controls">
    ${controlsMarkup}
    </section>`
  );
};

export default class PopupControls extends AbstractComponent {
  getTemplate() {
    return createPopupControlsTemplate();
  }
}
