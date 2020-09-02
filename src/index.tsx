import React from "react";
import ReactDOM from "react-dom";
import Home from "./presentation/pages/Home";
import GlobalStyles from "./presentation/styles/global";

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);
