export const generateLists = () => {
  return [{
    name: `All movies. Upcoming`,
    type: `all`,
    count: 5,
    sort(films) {
      const allFilms = films.slice();
      return allFilms;
    },
  },
  {
    name: `Top rated`,
    type: `extra`,
    count: 2,
    sort(films) {
      const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
      return topRatedFilms;
    },
  },
  {
    name: `Most commented`,
    type: `extra`,
    count: 2,
    sort(films) {
      const mostCommentedFilms = films.slice().sort((a, b) => b.comments - a.comments);
      return mostCommentedFilms;
    },
  },
  ];
};
