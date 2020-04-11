const createNavigationMarkup = (navItems, isActive) => {
  const {name, count, href} = navItems;

  const activeNavItemClass = isActive ? `main-navigation__item--active` : ``;
  const inactiveNavItemCount = `All movies`;
  const navItemCount = (name === inactiveNavItemCount) ? `` : `<span class="main-navigation__item-count">${count}</span>`;

  return (`
      <a href="#${href}" class="main-navigation__item ${activeNavItemClass}">${name} ${navItemCount }</a>`
  );
};

const createNavigationTemplate = (navItems) => {
  const navigationsMarkup = navItems.map((it, i) => createNavigationMarkup(it, i === 0)).join(`\n`);
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
