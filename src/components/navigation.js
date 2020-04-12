const createNavigationMarkup = (navItem, isActive) => {
  const {name, href, filter, showCount} = navItem;

  const activeNavItemClass = isActive ? `main-navigation__item--active` : ``;
  const navItemCount = showCount ? `<span class="main-navigation__item-count">${filter()}</span>` : ``;

  return (`
      <a href="#${href}" class="main-navigation__item ${activeNavItemClass}">${name} ${navItemCount }</a>`
  );
};

const createNavigationTemplate = (navItems) => {
  const navigationsMarkup = navItems
  .map((navItem, i) => createNavigationMarkup(navItem, i === 0)) //     callback(currentValue, !!index!!, array) реализовать передачу активного элемента, пока условно первый
  .join(`\n`);

  return (`
    <nav class="main-navigation">
    <div class="main-navigation__items">
    ${navigationsMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createNavigationTemplate};
