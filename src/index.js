import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDom from "react-dom";
import App from "./components/App.jsx";

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App.jsx", () => {
    render(App);
  });
}
