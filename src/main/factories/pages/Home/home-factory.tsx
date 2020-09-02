import React from "react";
import Home from "@/presentation/pages/Home";
import { loadCountriesFactory } from "@/main/factories/usecases";

const HomeFactory: React.FC = () => {
  return <Home loadCountries={loadCountriesFactory()} />;
};

export default HomeFactory;
