import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import {
  selectCurrentCountry,
  selectCountries,
} from "@/presentation/redux/selectors";
import { updateCountry } from "@/presentation/redux/actions";
import { Main, FormContainer, FormTop, FormBottom } from "./styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 16,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

type Props = { openModal: boolean; setOpenModal: (open: boolean) => void };

const UpdateCountry: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const classes = useStyles();
  const country = useSelector(selectCurrentCountry);
  const [name, setName] = useState<string>();
  const [capital, setCapital] = useState<string>();
  const [population, setPopulation] = useState<number>();
  const [area, setArea] = useState<number>();
  const [topLevelDomains, setTopLevelDomains] = useState<string>();
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    if (country) {
      const { name, capital, population, area, topLevelDomain } = country;
      setName(name);
      setCapital(capital);
      setPopulation(population);
      setArea(area);
      setTopLevelDomains(topLevelDomain);
    }
  }, [country]);

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(
        updateCountry({
          country: {
            name,
            capital,
            population,
            area,
            topLevelDomain: topLevelDomains,
            id: country.id,
            flag: country.flag,
          },
          countries,
        })
      );
      setOpenModal(false);
    },
    [
      dispatch,
      country,
      countries,
      setOpenModal,
      name,
      capital,
      population,
      area,
      topLevelDomains,
    ]
  );

  return (
    <div data-testid="update-country">
      <Modal
        open={openModal}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Main data-testid="form">
          {country && (
            <Card className={classes.paper}>
              <CardContent>
                <Typography
                  title="title"
                  variant="h4"
                  component="h4"
                  className={classes.title}
                >
                  {country.name}
                </Typography>
                <FormContainer>
                  <FormTop>
                    <div>
                      <TextField
                        inputProps={{ "data-testid": "name-input" }}
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        inputProps={{ "data-testid": "capital-input" }}
                        label="Capital"
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        type="text"
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        inputProps={{ "data-testid": "population-input" }}
                        label="População"
                        value={population}
                        onChange={(e) => setPopulation(Number(e.target.value))}
                        type="text"
                        variant="outlined"
                      />
                    </div>
                  </FormTop>
                  <FormBottom>
                    <TextField
                      inputProps={{ "data-testid": "area-input" }}
                      label="Área"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      type="text"
                      variant="outlined"
                    />
                    <div style={{ width: "4%" }} />
                    <TextField
                      inputProps={{ "data-testid": "top-level-input" }}
                      value={topLevelDomains}
                      onChange={(e) => setTopLevelDomains(e.target.value)}
                      label="Domínio de topo"
                      type="text"
                      variant="outlined"
                    />
                  </FormBottom>
                  <div style={{ marginTop: "16px" }}>
                    <Button
                      data-testid="submit"
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={{ width: "100%" }}
                      onClick={handleSubmit}
                    >
                      Confirmar
                    </Button>
                  </div>
                </FormContainer>
              </CardContent>
            </Card>
          )}
        </Main>
      </Modal>
    </div>
  );
};

export default UpdateCountry;
