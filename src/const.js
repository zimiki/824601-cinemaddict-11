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

const EMOJIIS = [`smile`, `sleeping`, `puke`, `angry`];

export {INDEX_LISTS, NAVIGATION_ITEMS, EMOJIIS};
