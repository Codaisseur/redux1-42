export const selectPizzas = state => state.pizzas;

export const selectPizzasWithFavourites = state => {
  // id, name, description, bought, isFavourite
  const pizzasWithFavourites = state.pizzas.map(pizza => ({
    ...pizza,
    isFavourite: state.user.favourites.includes(pizza.id), // user.favourites is list of ids, we check if this pizza is included.
  }));
  return pizzasWithFavourites;
};

export const useDarkMode = state => state.user.darkMode;

// export const selectPizzasWithFavourites2 = state =>
//   state.pizzas.map(pizza => ({
//     ...pizza,
//     isFavourite: state.user.favourites.includes(pizza.id), // user.favourites is list of ids, we check if this pizza is included.
//   }));
