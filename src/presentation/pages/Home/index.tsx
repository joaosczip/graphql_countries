import React, { useState, useEffect, useCallback } from "react";
import { BasicCountry } from "@/domain/models";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import { Container, CountriesContainer } from "./styles";

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
          limit: defaultLimit,
        });
        setCountries((oldCountries) => [...oldCountries, ...countriesResult]);
      } catch (error) {
        setError(error);
      }
    },
    [loadCountries, defaultLimit]
  );

  const updateCountriesList = useCallback(async () => {
    const newOffset = queryOffset + defaultLimit;
    await handleLoadCountries(newOffset);
    setQueryOffset(queryOffset + defaultLimit);
  }, [queryOffset, defaultLimit, handleLoadCountries]);

  useEffect(() => {
    handleLoadCountries();
  }, [handleLoadCountries]);

  return (
    <div style={{ position: "relative" }}>
      <Container data-testid="container">
        <CountriesContainer
          dataLength={countries.length}
          next={updateCountriesList}
          hasMore={true}
          loader={!error && <h1>Carregando...</h1>}
        >
          <div data-testid="countries-container">
            {countries &&
              countries.map((country) => (
                <CountryCard key={country.id} {...country} />
              ))}
          </div>
        </CountriesContainer>
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
