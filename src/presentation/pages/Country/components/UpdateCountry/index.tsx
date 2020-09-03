import React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
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
              <Typography variant="h4" component="h4" className={classes.title}>
                Algeria
              </Typography>
              <FormContainer>
                <FormTop>
                  <div>
                    <TextField label="Nome" type="text" variant="outlined" />
                  </div>
                  <div>
                    <TextField label="Capital" type="text" variant="outlined" />
                  </div>
                  <div>
                    <TextField
                      label="População"
                      type="text"
                      variant="outlined"
                    />
                  </div>
                </FormTop>
                <FormBottom>
                  <TextField label="População" type="text" variant="outlined" />
                  <div style={{ width: "4%" }} />
                  <TextField
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
