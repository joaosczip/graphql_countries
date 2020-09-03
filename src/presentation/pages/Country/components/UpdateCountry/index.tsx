import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { selectCurrentCountry } from "@/presentation/redux/selectors";
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

const UpdateCountry: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const classes = useStyles();
  const country = useSelector(selectCurrentCountry);

  return (
    <div data-testid="update-country">
      <Modal
        open={isOpen}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Main>
          <Card className={classes.paper}>
            <CardContent>
              <Typography
                title="title"
                variant="h4"
                component="h4"
                className={classes.title}
              >
                {country?.name}
              </Typography>
              <FormContainer>
                <FormTop>
                  <div>
                    <TextField
                      inputProps={{ "data-testid": "name-input" }}
                      label="Nome"
                      value={country?.name}
                      type="text"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      inputProps={{ "data-testid": "capital-input" }}
                      label="Capital"
                      value={country?.capital}
                      type="text"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      inputProps={{ "data-testid": "population-input" }}
                      label="População"
                      value={country?.population}
                      type="text"
                      variant="outlined"
                    />
                  </div>
                </FormTop>
                <FormBottom>
                  <TextField
                    inputProps={{ "data-testid": "area-input" }}
                    label="Área"
                    value={country?.area}
                    type="text"
                    variant="outlined"
                  />
                  <div style={{ width: "4%" }} />
                  <TextField
                    inputProps={{ "data-testid": "top-level-input" }}
                    value={country?.topLevelDomain}
                    label="Domínio de topo"
                    type="text"
                    variant="outlined"
                  />
                </FormBottom>
                <div style={{ marginTop: "16px" }}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={{ width: "100%" }}
                  >
                    Confirmar
                  </Button>
                </div>
              </FormContainer>
            </CardContent>
          </Card>
        </Main>
      </Modal>
    </div>
  );
};

export default UpdateCountry;
