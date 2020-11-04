import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Home } from '../pages';

class App extends Component {
  render() {
    return (
          <Route exact path="/" component={Home} />
    );
  }
}

export default App;