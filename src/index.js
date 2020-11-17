import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./index.css";
import Root from "./client/Root";
import { createStore } from "redux";

const store = createStore();

ReactDOM.render(
      <Provider>
            <Root />
      </Provider>, document.getElementById("root")
);