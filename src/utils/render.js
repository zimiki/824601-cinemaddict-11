const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

// Вспомогательная функцию для создания DOM-элемента
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (oldComponet, newComponet) =>{
  const oldElement = oldComponet.getElement();
  const newElement = newComponet.getElement();
  const parent = oldElement.parentElement;
  parent.replaceChild(newElement, oldElement);
};

export {RenderPosition, render, createElement, remove, replace};
