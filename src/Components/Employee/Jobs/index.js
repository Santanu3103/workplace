import { Grid } from '@mui/material'
import React from 'react'
import Form from './Form'
import Sidebar from './Sidebar'
function Job() {
  const [mobileViewForm, setMobileViewForm] = React.useState(false);
const [selectedJob, setSelectedJob] = React.useState(null);
  const postAjobBtn = () => {
    setMobileViewForm(true)
    setSelectedJob(null)
  }
const selectedJobfun = (item) => {
  setMobileViewForm(true)
  setSelectedJob(item)
  console.log(item)
}
  return (
    <Grid
    
    sx={{
      margin: '10px auto',
      maxWidth: { xs: '95%', md: '100%'}

    }}
    container >
      <Grid
      sx ={{
        display: { xs: mobileViewForm?'none':'block', md: 'block' },
        background:' #fff',
        padding: '12px'
      }}
      
      item xs={12} md={4}>
        <Sidebar postAjobBtn={postAjobBtn} selectedJob={selectedJob} selectedJobfun={selectedJobfun} />
        </Grid>
      <Grid
      
      sx ={{
        display: { xs: mobileViewForm?'block':'none', md: 'block' },
      }}

      item xs={12} md={8}>
        <Form selectedJob={selectedJob}  setMobileViewForm={setMobileViewForm} />
        </Grid>
      </Grid>
  )
}

export default Job