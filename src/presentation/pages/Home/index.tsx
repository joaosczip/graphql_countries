import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/presentation/redux/store";
import { setCurrentError } from "@/presentation/redux/actions";
import { BasicCountry } from "@/domain/models";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import SkeletonCards from "./components/SkeletonCards";
import { Error as ErrorComponent, ErrorAlert } from "@/presentation/components";
import { Container, CountriesContainer } from "./styles";

type Props = {
  loadCountries: LoadCountries;
};

const Home: React.FC<Props> = ({ loadCountries }) => {
  const [countries, setCountries] = useState<BasicCountry[]>([]);
  const [error, setError] = useState<Error>();
  const [defaultLimit] = useState<number>(12);
  const [queryOffset, setQueryOffset] = useState<number>(0);
  const dispatch = useDispatch();
  const globalError = useSelector((state: RootState) => state.global.error);

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
    if (!countries.length) {
      handleLoadCountries();
    }
  }, [handleLoadCountries, countries.length]);

  return (
    <div style={{ position: "relative" }}>
      {error && (
        <div>
          <ErrorComponent error={error} />
        </div>
      )}
      <Container data-testid="container">
        <CountriesContainer
          dataLength={countries.length}
          next={updateCountriesList}
          hasMore={true}
          loader={!error ? <SkeletonCards /> : null}
        >
          <div data-testid="countries-container">
            {countries &&
              countries.map((country) => (
                <CountryCard key={country.id} {...country} />
              ))}
          </div>
        </CountriesContainer>
      </Container>
      {globalError && (
        <ErrorAlert
          error={globalError}
          handleClose={() => dispatch(setCurrentError(error))}
        />
      )}
    </div>
  );
};

export default Home;
