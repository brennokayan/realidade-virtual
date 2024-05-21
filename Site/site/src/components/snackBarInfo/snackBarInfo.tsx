import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

interface Props {
  message: string;
  type: "success" | "error" | "info";
  toOpen: boolean;
  handleClose: () => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export function SnackBarInfo(props: Props) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const snackBarClass =
    props.type === "success"
      ? "snackbar-success"
      : props.type === "error"
      ? "snackbar-error"
      : "snackbar-info";
  return (
    <div>
      <Snackbar
        className={snackBarClass}
        anchorOrigin={
          props.anchorOrigin
            ? props.anchorOrigin
            : { vertical: "top", horizontal: "left" }
        }
        open={props.toOpen}
        autoHideDuration={4000}
        onClose={props.handleClose}
        message={props.message}
        action={action}
      >
        <Alert severity={props.type}>{props.message}</Alert>
      </Snackbar>
    </div>
  );
}
