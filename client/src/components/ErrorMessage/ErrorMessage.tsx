import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

interface Props {
  error: string;
  setError: (error: string) => void;
}

const ErrorMessage: React.FC<Props> = ({ error, setError }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setError("");
    setOpen(false);
  };

  useEffect(() => {
    error ? setOpen(true) : setOpen(false);
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {error && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} className="error-message">
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleClose}>{error}</MuiAlert>
      </Snackbar>}
    </>
  );
};

export default ErrorMessage;