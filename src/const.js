const INDEX_LISTS = [
  {
    name: `All movies. Upcoming`,
    type: `films-list`,
    showHeader: false,
    showMoreButton: true,
    getData(data) {
      return data.slice();
    }
  },
  {
    name: `Top rated`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {
      return data.slice().sort((a, b) => b.rating - a.rating);
    }
  },
  {
    name: `Most commented`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {
      return data.slice().sort((a, b) => b.comments.length - a.comments.length);
    }
  },
];

const EMOJIIS = [`smile`, `sleeping`, `puke`, `angry`];

export {INDEX_LISTS, EMOJIIS};
