import React from "react";
import { Provider } from "react-redux";
import { store } from "./Stores/store";
import { BrowserRouter as Router } from "react-router-dom";
import RootApp from "./RootApp";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootApp />
      </Router>
    </Provider>
  );
}

export default App;
