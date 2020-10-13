import React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";

let Index = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Index />, rootElement);
} else {
  render(<Index />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
