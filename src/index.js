import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./index.css";
import Root from "./client/Root";
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, document.getElementById("root")
);