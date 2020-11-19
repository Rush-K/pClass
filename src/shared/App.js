import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home, Main, SubjOrder, ProjOrder } from '../containers';



class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/subject/:name" render={props => <SubjOrder {...props} />} />
          <Route path="/subject/:name/:pname" render={props => <ProjOrder {...props} />} />
          <Route path="/main" render={props => <Main {...props} /> } />
      </div>
    );
  }
}

export default App;