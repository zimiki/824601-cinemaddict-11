import AbstractComponent from "./abstract-component.js";

const NAVIGATION_ITEMS = [
  {
    name: `All movies`,
    href: `#all`,
    filter() {
      const count = Math.floor(Math.random() * 10);
      return count;
    },
    showCount: false,
  },
  {
    name: `Watchlist`,
    href: `#watchlist`,
    filter() {
      const count = Math.floor(Math.random() * 10);
      return count;
    },
    showCount: true,
  },
  {
    name: `History`,
    href: `#history`,
    filter() {
      const count = Math.floor(Math.random() * 10);
      return count;
    },
    showCount: true,
  },
  {
    name: `Favorites`,
    href: `#favorites`,
    filter() {
      const count = Math.floor(Math.random() * 10);
      return count;
    },
    showCount: true,
  },
];
const createNavigationMarkup = (navItem, isActive) => {
  const {name, href, filter, showCount} = navItem;
  const activeNavItemClass = isActive ? `main-navigation__item--active` : ``;
  const navItemCount = showCount ? `<span class="main-navigation__item-count">${filter()}</span>` : ``;

  return (
    `<a href="${href}" class="main-navigation__item ${activeNavItemClass}">${name} ${navItemCount }</a>`
  );
};

// ?????? Необходимо доделать здесь подсвечивается 0 - элемент массива, а нужно текущий
const createNavigationTemplate = () => {
  const navigationsMarkup = NAVIGATION_ITEMS.map((navItem, i) => createNavigationMarkup(navItem, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation"><div class="main-navigation__items">
    ${navigationsMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createNavigationTemplate();
  }
}
