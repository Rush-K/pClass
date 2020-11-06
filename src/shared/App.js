import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home, Main, SubjOrder } from '../pages';

class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" component={Home} />
          <Switch>
            <Route path="/subject/:name" component={SubjOrder} />
            <Route path="/main" component={Main} />
          </Switch>
      </div>
    );
  }
}

export default App;