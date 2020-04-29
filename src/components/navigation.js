import AbstractComponent from "./abstract-component.js";

const createNavigationMarkup = (navItem, isActive) => {
  const {name, href, filter, showCount} = navItem;
  const activeNavItemClass = isActive ? `main-navigation__item--active` : ``;
  const navItemCount = showCount ? `<span class="main-navigation__item-count">${filter()}</span>` : ``;

  return (
    `<a href="${href}" class="main-navigation__item ${activeNavItemClass}">${name} ${navItemCount }</a>`
  );
};

// ?????? Необходимо доделать здесь подсвечивается 0 - элемент массива, а нужно текущий
const createNavigationTemplate = (navItems) => {
  const navigationsMarkup = navItems.map((navItem, i) => createNavigationMarkup(navItem, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation"><div class="main-navigation__items">
    ${navigationsMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }
  getTemplate() {
    return createNavigationTemplate(this._items);
  }
}
