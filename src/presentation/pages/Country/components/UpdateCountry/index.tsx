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
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import {
  selectCurrentCountry,
  selectCountries,
} from "@/presentation/redux/selectors";
import { updateCountry } from "@/presentation/redux/actions";
import { Main, FormContainer, FormTop, FormBottom } from "./styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  const [formError, setFormError] = useState<boolean>(false);
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!country) return;

    const { name, capital, population, area, topLevelDomains } = country;
    setName(name);
    setCapital(capital);
    setPopulation(population);
    setArea(area);
    setTopLevelDomains(topLevelDomains);
  }, [country]);

  const isValid = (value: any) => Boolean(value);

  useEffect(() => {
    if (!country) return;

    const isInvalid = [name, capital, population, area, topLevelDomains].filter(
      (field) => !isValid(field)
    ).length
      ? true
      : false;

    if (isInvalid) {
      setFormError(true);
      return;
    }

    setFormError(false);
  }, [country, name, capital, population, area, topLevelDomains]);

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
            topLevelDomains,
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

  const getValidationMessage = (value: any): string => {
    return !isValid(value) && "Campo obrigatório.";
  };

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
                <div className={classes.title}>
                  <Typography title="title" variant="h4" component="h4">
                    {country.name}
                  </Typography>
                  <Button
                    onClick={() => setOpenModal(false)}
                    data-testid="close-modal"
                    color="secondary"
                  >
                    <CloseOutlined />
                  </Button>
                </div>
                <FormContainer>
                  <FormTop>
                    <div>
                      <TextField
                        data-testid="name-group"
                        error={!isValid(name)}
                        inputProps={{ "data-testid": "name-input" }}
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        variant="outlined"
                        required={true}
                        helperText={getValidationMessage(name)}
                      />
                    </div>
                    <div>
                      <TextField
                        data-testid="capital-group"
                        error={!isValid(capital)}
                        inputProps={{ "data-testid": "capital-input" }}
                        label="Capital"
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                        type="text"
                        variant="outlined"
                        required={true}
                        helperText={getValidationMessage(capital)}
                      />
                    </div>
                    <div>
                      <TextField
                        data-testid="population-group"
                        error={!isValid(population)}
                        inputProps={{ "data-testid": "population-input" }}
                        label="População"
                        value={population}
                        onChange={(e) => setPopulation(Number(e.target.value))}
                        type="number"
                        inputMode="numeric"
                        variant="outlined"
                        required={true}
                        helperText={getValidationMessage(population)}
                      />
                    </div>
                  </FormTop>
                  <FormBottom>
                    <TextField
                      data-testid="area-group"
                      error={!isValid(area)}
                      inputProps={{ "data-testid": "area-input" }}
                      label="Área"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      type="number"
                      inputMode="numeric"
                      variant="outlined"
                      required={true}
                      helperText={getValidationMessage(area)}
                    />
                    <div style={{ width: "4%" }} />
                    <TextField
                      error={!isValid(topLevelDomains)}
                      data-testid="top-level-group"
                      inputProps={{ "data-testid": "top-level-input" }}
                      value={topLevelDomains}
                      onChange={(e) => setTopLevelDomains(e.target.value)}
                      label="Domínio de topo"
                      type="text"
                      variant="outlined"
                      required={true}
                      helperText={getValidationMessage(topLevelDomains)}
                    />
                  </FormBottom>
                  <div style={{ marginTop: "16px" }}>
                    <Button
                      disabled={formError}
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
