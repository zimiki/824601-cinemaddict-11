const createListMarkup = (list) => {
  const {name, type, showHeader} = list;

  return (`
      <section class="${type}">
      <h2 class="films-list__title ${showHeader ? `` : `visually-hidden`}">${name}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createLists = (lists) => {
  const listsMarkup = lists.map(createListMarkup).join(`\n`);
  return (`<section class="films">
  ${listsMarkup}
  </section>`);
};

export {createLists};

