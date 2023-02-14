import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function SearchableDropDown({ options, onChange }) {
  return (
    <Autocomplete
      disablePortal
      size="small"
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      fullWidth
      id="combo-box-demo"
      options={options}
      renderInput={(params) => <TextField size="small" fullWidth {...params} />}
    />
  );
}

export default SearchableDropDown;
