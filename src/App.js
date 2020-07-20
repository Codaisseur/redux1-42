import React from "react";
import "./App.css";
import PizzaList from "./components/PizzaList";
import { useDarkMode } from "./store/selectors";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isDarkMode = useSelector(useDarkMode);
  const dispatch = useDispatch();

  const background = isDarkMode
    ? { backgroundColor: "#282c34", color: "white" }
    : { backgroundColor: "#ffffff", color: "black" };

  const toggleDarkMode = () => {
    const action = {
      type: "TOGGLE_DARK_MODE",
    };
    dispatch(action);
  };
  return (
    <div className='App'>
      <header className='App-header' style={background}>
        <button onClick={toggleDarkMode}>Dark Mode!</button>
        <h1>{"My first redux powered app :)"}</h1>
        <PizzaList />
      </header>
    </div>
  );
}

export default App;
