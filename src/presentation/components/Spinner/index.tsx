import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner: React.FC = () => {
  return (
    <div data-testid="spinner">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
