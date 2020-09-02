import React, { useState, useEffect, useCallback } from "react";
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

  const handleLoadCountries = useCallback(async () => {
    try {
      const countriesResult = await loadCountries.load({
        offset: 0,
        limit: 12,
      });
      setCountries(countriesResult);
    } catch (error) {
      setError(error);
    }
  }, [loadCountries]);

  useEffect(() => {
    handleLoadCountries();
  }, [handleLoadCountries]);

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
            <button data-testid="reload" onClick={handleLoadCountries}>
              Tentar novamente
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Home;
