import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home, Main, SubjOrder, ProjOrder } from '../containers';



class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/main" component={Main} />
          <Route exact path="/subject/:name" component={SubjOrder} />
          <Route path="/subject/:name/:pname" compoent={ProjOrder} />
      </div>
    );
  }
}

export default App;