import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  duration = 4000,
}) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
