import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
