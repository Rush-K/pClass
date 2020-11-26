
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./shared/App";
import store from './store';

console.log(sessionStorage);
ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App store={store}/>
    </Provider>
    </BrowserRouter>, document.getElementById("root")
);