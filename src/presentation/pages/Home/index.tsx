import React, { useState, useEffect, useCallback } from "react";
import { BasicCountry } from "@/domain/models";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import { Container } from "./styles";

type Props = {
  loadCountries: LoadCountries;
};

const Home: React.FC<Props> = ({ loadCountries }) => {
  const [countries, setCountries] = useState<BasicCountry[]>([]);
  const [error, setError] = useState<Error>();
  const [defaultLimit] = useState<number>(12);
  const [queryOffset, setQueryOffset] = useState<number>(0);

  const handleLoadCountries = useCallback(
    async (offset = 0) => {
      try {
        const countriesResult = await loadCountries.load({
          offset,
        });
        setCountries((oldCountries) => [...oldCountries, ...countriesResult]);
      } catch (error) {
        setError(error);
      }
    },
    [loadCountries]
  );

  const updateCountriesList = useCallback(async () => {
    const newOffset = queryOffset + defaultLimit;
    await handleLoadCountries(newOffset);
    setQueryOffset(queryOffset + defaultLimit);
  }, [queryOffset, defaultLimit, handleLoadCountries]);

  useEffect(() => {
    handleLoadCountries();
  }, [handleLoadCountries]);

  useEffect(() => console.log("countries", countries), [countries]);

  return (
    <div style={{ position: "relative" }}>
      <Container data-testid="container">
        <div
          data-testid="countries-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {countries
            ? countries.map((country) => (
                <CountryCard key={country.id} {...country} />
              ))
            : null}
        </div>
        {error && (
          <div data-testid="error-container">
            <span data-testid="error-message">{error.message}</span>
            <button data-testid="reload" onClick={handleLoadCountries}>
              Tentar novamente
            </button>
          </div>
        )}
        <button onClick={updateCountriesList} data-testid="load-more">
          Carregar mais
        </button>
      </Container>
    </div>
  );
};

export default Home;
