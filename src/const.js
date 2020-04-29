const INDEX_LISTS = [
  {
    name: `All movies. Upcoming`,
    type: `films-list`,
    showHeader: false,
    showMoreButton: true,
    getData(data) {
      console.log(data.slice(0, 5));
      return data.slice();
    }
  },
  {
    name: `Top rated`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {

      const aa = data.slice().sort((a, b) => b.rating - a.rating);
      console.log(aa.slice(0, 3));
      return aa.slice(0, 3);
    }
  },
  {
    name: `Most commented`,
    type: `films-list--extra`,
    showHeader: true,
    showMoreButton: false,
    getData(data) {

      const bb = data.slice().sort((a, b) => b.comments - a.comments);
      console.log(bb.slice(0, 2));
      return bb.slice(0, 2);
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
