import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  experience,
  primaryRole,
  skills,
  jobType,
  currency,
} from "../../constants";
import SearchableDropDown from "../../Common/SearchableDropDown";
import "./job.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../FireBase";
import { v4 as uuidv4 } from "uuid";
import { userContext } from "../../../context/userContext";
const initialState={
  jobTitle: "",
    jobDescription: "",
    jobType: "",
    primaryRole: "",
    jobLocation: "",
    salaryRange: {
      currency: "",
      min: "",
      max: "",
    },
    skills: [],
    experience: "",
  
}
function Form({ setMobileViewForm, selectedJob }) {
  const [disabledField, setDisabledField] = React.useState(false);
  const [state, dispatch] = useContext(userContext);
  const [data, setData] = React.useState(initialState);
  
  useEffect(() => {
    if (selectedJob) {
      setData(selectedJob);
    }
    else{
      setData(initialState)
    }
  }, [selectedJob]);

  const setSkills = (skill) => {
    //if skill is already present in the array then remove it
    // else add it

    if (data.skills.includes(skill)) {
      setData({
        ...data,
        skills: data.skills.filter((item) => item !== skill),
      });
    } else {
      setData({ ...data, skills: [...data.skills, skill] });
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const jobId = selectedJob?selectedJob.jobId:uuidv4()
    try {
      // call firebase firestore to sate this job in jobs collection
      await setDoc(
        //doc refrence,
        doc(
          // db refrence
          db,
          //collection name
          "jobs",
          // doc id
          jobId
        ),
        // data
        {
          ...data,
          employerId: state.user.email,
          companyName: state.userInfo.companyName,
          companyTag: state.userInfo.companyTag,
          companySize: state.userInfo.companySize,
          jobId,
          createdAt: new Date(),
          companyLogo:state.userInfo.companyLogo
        }
      );
      alert("sucess");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <Button
        type="button"
        sx={{
          display: { xs: "block", md: "none" },
          background: "#d04b4b",
          marginBottom: "10px",
        }}
        className="save-btn"
        onClick={() => setMobileViewForm(false)}
      >
        back
      </Button>
      <Grid className="grid-container" container spacing={2}>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Title</label>
          <TextField
            disabled={disabledField}
            size="small"
            fullWidth
            required
            value={data.jobTitle}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
          />
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Location</label>
          <TextField
            disabled={disabledField}
            size="small"
            fullWidth
            required
            value={data.jobLocation}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) => setData({ ...data, jobLocation: e.target.value })}
          />
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Job Type</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.jobType}
            size="small"
            fullWidth
            onChange={(e) => setData({ ...data, jobType: e.target.value })}
          >
            {jobType.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>

        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Primary Role</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.primaryRole}
            size="small"
            fullWidth
            onChange={(e) => setData({ ...data, primaryRole: e.target.value })}
          >
            {primaryRole.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Experience</label>
          <Select
            disabled={disabledField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.experience}
            size="small"
            fullWidth
            onChange={(e) => setData({ ...data, experience: e.target.value })}
          >
            {experience.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid className="grid-item" item xs={12} sm={6}>
          <label>Salary Range</label>
          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              <Select
                disabled={disabledField}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.currency}
                placeholder="currency"
                size="small"
                fullWidth
                onChange={(e) =>
                  setData({
                    ...data,
                    salaryRange: {
                      ...data.salaryRange,
                      currency: e.target.value,
                    },
                  })
                }
              >
                {currency.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={disabledField}
                size="small"
                fullWidth
                type={"number"}
                placeholder="min"
                required
                value={data.salaryRange.min}
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                    border: "1px solid #00000036",
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    salaryRange: {
                      ...data.salaryRange,
                      min: e.target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={disabledField}
                size="small"
                fullWidth
                type={"number"}
                required
                placeholder="max"
                value={data.salaryRange.max}
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                    border: "1px solid #00000036",
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    salaryRange: {
                      ...data.salaryRange,
                      max: e.target.value,
                    },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid className="grid-item" item xs={12}>
          <label>Skills </label>
          <SearchableDropDown
            disabled={disabledField}
            options={skills}
            onChange={(newValue) => setSkills(newValue)}
          />
          <div className="skills-container">
            {data.skills.map((item) => {
              return (
                <div
                  onClick={() => {
                    !disabledField && setSkills(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <label>Job Description</label>
          <TextField
            disabled={disabledField}
            size="small"
            multiline
            minRows={4}
            fullWidth
            required
            value={data.jobDescription}
            sx={{
              fieldset: {
                borderRadius: "10px",
                border: "1px solid #00000036",
              },
            }}
            onChange={(e) =>
              setData({ ...data, jobDescription: e.target.value })
            }
          />
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="grid-item"
          item
          xs={12}
        >
          <Button
            sx={{
              background: "#4540DB",
            }}
            type="submit"
            className="save-btn"
          >
           {
            selectedJob?"SAVE":"POST JOB"
           }
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
