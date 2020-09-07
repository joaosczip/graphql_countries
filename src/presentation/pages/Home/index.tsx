import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCountries,
  setQueryOffset,
  setSearchItems,
} from "@/presentation/redux/actions";
import { LoadCountries, FindCountries } from "@/domain/usecases";
import { CountryCard } from "./components";
import SkeletonCards from "./components/SkeletonCards";
import { ErrorAlert, HeaderBar } from "@/presentation/components";
import { Container, CountriesContainer } from "./styles";
import {
  selectCountries,
  selectQueryOffset,
  selectError,
  selectSearchInput,
} from "@/presentation/redux/selectors";

type Props = {
  loadCountries: LoadCountries;
  findCountries: FindCountries;
};

const Home: React.FC<Props> = ({ loadCountries, findCountries }) => {
  const [error, setError] = useState<Error>(useSelector(selectError));
  const [defaultLimit] = useState<number>(12);
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const queryOffset = useSelector(selectQueryOffset);
  const searchInput = useSelector(selectSearchInput);

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

  useEffect(() => {
    async function handleSearchCountries() {
      try {
        const countriesResult = await findCountries.find({ name: searchInput });
        dispatch(setSearchItems([...countriesResult]));
      } catch (error) {
        setError(error);
      }
    }

    if (!Boolean(searchInput)) {
      dispatch(setSearchItems([]));
      return;
    }
    handleSearchCountries();
  }, [searchInput, findCountries, dispatch]);

  return (
    <>
      <HeaderBar />
      <div style={{ position: "relative" }}>
        <Container data-testid="container">
          <CountriesContainer
            dataLength={countries.length}
            next={updateCountriesList}
            hasMore={true}
            loader={!error ? <SkeletonCards /> : null}
          >
            <div data-testid="countries-container">
              {countries.length
                ? countries.map((country) => (
                    <CountryCard key={country.id} {...country} />
                  ))
                : null}
            </div>
          </CountriesContainer>
        </Container>
        {error && (
          <ErrorAlert error={error} handleClose={() => setError(null)} />
        )}
      </div>
    </>
  );
};

export default Home;
