import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
function Body() {
  return (
    <Card className="text-center" style={{margin:"5rem"}}>
      <Card.Body>
      <Box sx={{width:"100vw",paddingLeft:"30rem"}}>
         
         <Button
           key="logout"
           variant="contained"       
           sx={{ my: 2, color: '#fff'}}
         >
           LOGOUT
         </Button>
      
        </Box>

      <h2 style={{padding:"30px"}}>Setup your profile</h2>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      
      <Grid container spacing={10} >
      <Grid item  sm={9}  >
         
        </Grid>
        <Grid item  sm={3}>
       
        </Grid>
        <Grid item  sm={6} >
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="filled"
          />
        </Grid>
        <Grid item  sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
        <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="filled"
          />

        </Grid>
        <Grid item sm={6}>
         
        </Grid>
        <Grid item  sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="filled"
          />
        </Grid>
        <Grid item  sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="filled"
          />
        </Grid>
        <Grid item  sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="filled"
          />
        </Grid>
        <Grid item  sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="filled"
          />
        </Grid>
        <Grid item sm={6}>
          
        </Grid>
        <Grid item xs={12}>    
        <Form.Control as="textarea" rows={5} />      
        </Grid>
        <Grid item xs={12} sx={{ m: 9, border: '1px dashed grey' }}>    
        <Box component="span" >
        <Button
            variant="contained"
            sx={{ my: 2, color: '#fff',marginLeft:'10px' }}  
            >Upload</Button>
        </Box>
        </Grid>
        <Grid item sm={9} >    
       
        </Grid>
        <Grid item sm={3} >    
        <Box sx={{width:"100vw",display:"flex",marginLeft:'7rem' }}>
         
         <Button
           key="logout"
           variant="contained"       
           sx={{ my: 2, color: '#fff' }}
         >
           LOGOUT
         </Button>
      
        </Box>
        </Grid>
      </Grid>
     
    </React.Fragment>
      </Card.Body>   
        
     
    </Card>
  );
}


 const CandidateProfile = () => {

  return (
    <div>
      <Body/>
    </div>
  )
}


export default CandidateProfile