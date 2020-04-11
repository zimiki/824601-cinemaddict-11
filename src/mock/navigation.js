const navName = [`All movies`, `Watchlist`, `History`, `Favorites`];


const generateNavItems = () => {
  return navName.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
      href: it,
    };
  });
};

export {generateNavItems};
