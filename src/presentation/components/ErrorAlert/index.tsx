import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const ErrorAlert: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <Snackbar
      data-testid="error-alert"
      open={true}
      autoHideDuration={3000}
      onClose={() => {}}
    >
      <Alert variant="filled" elevation={6} onClose={() => {}} severity="error">
        <span data-testid="error-message">{error.message}</span>
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
