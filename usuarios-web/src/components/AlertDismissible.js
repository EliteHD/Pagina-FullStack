import React from "react";
import { Alert, Button } from "@material-tailwind/react";

export function AlertDismissible({ message, open, setOpen }) {
  return (
    <>
      {open && (
        <Alert className="fixed top-5 right-5 z-50" open={open} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      )}
    </>
  );
}
