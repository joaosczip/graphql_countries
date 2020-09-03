import React from "react";
import { BrowserRouter, Switch, Route as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/presentation/redux/store";
import GlobalStyles from "@/presentation/styles/global";
import { HomeFactory, CountryFactory } from "@/main/factories";

const Route: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <Router exact path="/" render={() => <HomeFactory />} />
          <Router
            exact
            path="/country/:countryId"
            component={() => <CountryFactory />}
          />
        </Provider>
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default Route;
