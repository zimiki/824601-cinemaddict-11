const createListMarkup = (list) => {
  const {name, type} = list;
  const isAllFilms = `all`;

  return (`
      <section class="${type === isAllFilms ? `films-list` : `films-list--extra`}">
      <h2 class="films-list__title ${type === isAllFilms ? ` visually-hidden` : ``}">${name}</h2>
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

