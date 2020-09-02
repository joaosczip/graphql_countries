import React from "react";
import { BrowserRouter, Switch, Route as Router } from "react-router-dom";
import GlobalStyles from "@/presentation/styles/global";
import { HomeFactory } from "@/main/factories";
import Country from "@/presentation/pages/Country";

const Route: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router exact path="/" render={() => <HomeFactory />} />
        <Router
          exact
          path="/country/:countryId"
          component={() => <Country />}
        />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default Route;
