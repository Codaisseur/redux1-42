import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPizzasWithFavourites } from "../store/selectors";

export default function PizzaList() {
  const pizzas = useSelector(selectPizzasWithFavourites);
  const dispatch = useDispatch();
  const [filters, setFilter] = useState({});

  const pizzasIngredients = pizzas.map(p => p.ingredients);
  const uniqueIngredients = pizzasIngredients.reduce((acc, ings) => {
    // ing => ["", ""]
    ings.forEach(ing => !acc.includes(ing) && acc.push(ing));
    return acc;
  }, []);

  const onRemoveClick = id => {
    console.log("remove pizza!");
    const action = {
      type: "REMOVE_PIZZA",
      payload: id,
    };
    dispatch(action);
  };

  const onFavouriteClick = id => {
    console.log("adding favourite");
    const action = {
      type: "TOGGLE_FAVOURITE",
      payload: id,
    };
    dispatch(action);
  };

  const onFilterClick = name => {
    // update filter object
    const newFilter = {
      ...filters,
      [name]: !filters[name],
    };
    setFilter(newFilter);
  };

  // transform filter object to array of active filter names
  const activeFilters = Object.keys(filters).filter(name => filters[name]);
  console.log(filters);
  console.log(activeFilters);

  // keep pizzas that at least one of the ingredients is set on the filter.
  const filteredPizzas = !activeFilters.length
    ? pizzas
    : pizzas.filter(p =>
        p.ingredients.some(ingredient => activeFilters.includes(ingredient))
      );

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <div>
        {uniqueIngredients.map(ing => (
          <button onClick={() => onFilterClick(ing)}>{ing}</button>
        ))}
      </div>
      <ul>
        {filteredPizzas.map(p => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <h2 onClick={() => onFavouriteClick(p.id)}>
              {p.isFavourite ? "♥" : "♡"}
            </h2>
            <button onClick={() => onRemoveClick(p.id)}>{"[-]"}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
