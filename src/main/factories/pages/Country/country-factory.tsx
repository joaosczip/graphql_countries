import React from "react";
import Country from "@/presentation/pages/Country";
import { showCountryFactory } from "@/main/factories/usecases";

const CountryFactory: React.FC = () => {
  return <Country showCountry={showCountryFactory()} />;
};

export default CountryFactory;
