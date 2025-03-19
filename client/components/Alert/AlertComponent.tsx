import { Alert } from "@mui/material";
import { useState } from "react";

interface AlertComponentProp {
  message: string;
  isError: boolean;
}
const AlertComponent = ({ message, isError }: AlertComponentProp) => {
  console.log("alert is ", message);
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
