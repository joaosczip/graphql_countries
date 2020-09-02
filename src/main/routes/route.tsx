import React from "react";
import { BrowserRouter, Switch, Route as Router } from "react-router-dom";
import GlobalStyles from "@/presentation/styles/global";
import { HomeFactory } from "@/main/factories";

const Route: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router to="/" render={() => <HomeFactory />} />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default Route;
