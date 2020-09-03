import React from "react";
import { BrowserRouter, Switch, Route as Router } from "react-router-dom";
import GlobalStyles from "@/presentation/styles/global";
import { HomeFactory, CountryFactory } from "@/main/factories";

const Route: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router exact path="/" render={() => <HomeFactory />} />
        <Router
          exact
          path="/country/:countryId"
          component={() => <CountryFactory />}
        />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default Route;
