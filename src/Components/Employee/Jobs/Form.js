import { Button } from "@mui/material";
import React from "react";

function Form({ setMobileViewForm }) {
  return (
    <div>
      <Button
        sx={{
          display: { xs: "block", md: "none" },
        }}
        onClick={() => setMobileViewForm(false)}
      >
        back
      </Button>
      <h1>Form</h1>
    </div>
  );
}

export default Form;
