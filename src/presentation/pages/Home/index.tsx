import React, { useState, useEffect } from "react";
import { BasicCountry } from "@/domain/models";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import { Container } from "./styles";

type Props = {
  loadCountries: LoadCountries;
};

const Home: React.FC<Props> = ({ loadCountries }) => {
  const [countries, setCountries] = useState<BasicCountry[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function handleLoadCountries() {
      try {
        const countriesResult = await loadCountries.load({
          offset: 0,
          limit: 12,
        });
        setCountries(countriesResult);
      } catch (error) {
        setError(error);
      }
    }
    handleLoadCountries();
  }, [loadCountries]);

  return (
    <div style={{ position: "relative" }}>
      <Container data-testid="container">
        {countries
          ? countries.map((country) => (
              <CountryCard key={country.id} {...country} />
            ))
          : null}
        {error && (
          <div data-testid="error-container">
            <span data-testid="error-message">{error.message}</span>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
