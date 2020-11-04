import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Home, Main } from '../pages';

class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default App;