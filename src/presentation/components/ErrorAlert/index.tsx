import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

type Props = {
  error: Error;
  handleClose: () => void;
};

const ErrorAlert: React.FC<Props> = ({ error, handleClose }) => {
  return (
    <Snackbar
      data-testid="error-alert"
      open={true}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        elevation={6}
        onClose={handleClose}
        severity="error"
      >
        <span data-testid="error-message">{error.message}</span>
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
