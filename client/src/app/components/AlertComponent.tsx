import { Alert } from "@mui/material";
import { useState } from "react";
import { AlertComponentProp } from "../types";

const AlertComponent = ({ message, isError }: AlertComponentProp) => {
  const [isOpen, setIsopen] = useState(true);

  return (
    <>
      {isOpen && (
        <Alert
          severity={isError ? "error" : "success"}
          onClose={() => {
            setIsopen(false);
          }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
