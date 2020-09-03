import React from "react";
import Home from "@/presentation/pages/Home";
import {
  loadCountriesFactory,
  findCountriesFactory,
} from "@/main/factories/usecases";

const HomeFactory: React.FC = () => {
  return (
    <Home
      loadCountries={loadCountriesFactory()}
      findCountries={findCountriesFactory()}
    />
  );
};

export default HomeFactory;
