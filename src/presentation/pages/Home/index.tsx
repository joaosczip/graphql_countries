import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCountries,
  setCurrentError,
  setQueryOffset,
} from "@/presentation/redux/actions";
import { LoadCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import SkeletonCards from "./components/SkeletonCards";
import { Error as ErrorComponent, ErrorAlert } from "@/presentation/components";
import { Container, CountriesContainer } from "./styles";
import {
  selectCountries,
  selectQueryOffset,
  selectError,
} from "@/presentation/redux/selectors";

type Props = {
  loadCountries: LoadCountries;
};

const Home: React.FC<Props> = ({ loadCountries }) => {
  const [error, setError] = useState<Error>();
  const [defaultLimit] = useState<number>(12);
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const queryOffset = useSelector(selectQueryOffset);
  const globalError = useSelector(selectError);

  const handleLoadCountries = useCallback(
    async (offset = 0) => {
      try {
        const countriesResult = await loadCountries.load({
          offset,
          limit: defaultLimit,
        });
        dispatch(setCountries(countriesResult));
      } catch (error) {
        setError(error);
      }
    },
    [loadCountries, defaultLimit, dispatch]
  );

  const updateCountriesList = useCallback(async () => {
    const newOffset = queryOffset + defaultLimit;
    await handleLoadCountries(newOffset);
    dispatch(setQueryOffset(queryOffset + defaultLimit));
  }, [queryOffset, defaultLimit, handleLoadCountries, dispatch]);

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
            {countries.length &&
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
