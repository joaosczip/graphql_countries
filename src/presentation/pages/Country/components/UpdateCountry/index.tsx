import React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
        <Card className={classes.paper}>
          <CardContent>
            <Typography variant="h1" component="h1">
              TEXTO
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default UpdateCountry;
