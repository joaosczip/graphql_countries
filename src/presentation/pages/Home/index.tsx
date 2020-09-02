import React, { useState, useEffect } from "react";
import { BasicCountry } from "@/domain/models";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import { Container } from "./styles";

type Props = {
  loadCountries: LoadCountries;
};

const Home: React.FC<Props> = ({ loadCountries }) => {
  const [countries, setCountries] = useState<BasicCountry[]>([]);

  useEffect(() => {
    loadCountries
      .load({
        offset: 0,
        limit: 12,
      })
      .then((countriesResult) => {
        setCountries(countriesResult);
      })
      .catch(console.log);
  }, [loadCountries]);

  return (
    <div style={{ position: "relative" }}>
      <Container data-testid="container">
        {countries &&
          countries.map((country) => (
            <CountryCard key={country.id} {...country} />
          ))}
      </Container>
    </div>
  );
};

export default Home;
