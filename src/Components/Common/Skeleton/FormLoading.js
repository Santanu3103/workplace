import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

function FormLoading({ fields }) {
  return (
    // <Stack spacing={1}>
      <Grid className="grid-container" container spacing={4} >
      {[...Array(fields)].map((_, i) => (
        <Grid item xs={12} sm={6}>
        <Skeleton key={i} variant="rectangular" width={'100%'} height={60} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width={'100%'} height={120} />
        </Grid>
     </Grid>
    // </Stack>
  );
}

export default FormLoading;
