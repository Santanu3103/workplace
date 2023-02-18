import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 function Dropdown({
  dropdowndata,
  onChange,
  value,
  disabled

 }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
       
        <Select
        disabled={disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          size='small'
          onChange={handleChange}
        >
          {
            dropdowndata.map((item, index) => {
              return <MenuItem value={item.value}>{item.label}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown