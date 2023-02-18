import { Button, TextField } from "@mui/material";
import React from "react";
import "./job.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SideJobCard from "./SideJobCard";
function Sidebar({ postAjobBtn, selectedJob,selectedJobfun }) {
  return (
    <div>
      <Button className="post-btn" onClick={postAjobBtn}>
        post a job
      </Button>
      <TextField
        size="small"
        fullWidth
        sx={{
          "& fieldset": {
            borderRadius: "20px",
          },
          margin: "10px 0",
        }}
        placeholder="Search by job title"
        InputProps={{
          startAdornment: (
            <SearchSharpIcon
              fontSize="large"
              sx={{ color: "grey", fontSize: "20px", margin: "0 10px" }}
            />
          ),
        }}
      />
      <div>
        {[
          {
            jobTitle: "Software Engineer",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "1",
          },
          {
            jobTitle: "Software Engineer-2",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "2",
          },
          {
            jobTitle: "Software Engineer-3",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "3",
          },
          {
            jobTitle: "Software Engineer BE",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "4",
          },
          {
            jobTitle: "Software Engineer-FE",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "5",
          },
          {
            jobTitle: "Cloud Engineer",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "6",
          },
          {
            jobTitle: "Cloud Engineer-2",
            createdAt: "2021-09-01T12:00:00.000Z",
            jobType: "Full Time",
            jobLocation: "Remote",
            jobId: "7",
          },
        ].map((item, index) => {
          return (
            <SideJobCard key={index} selectedJobfun={selectedJobfun} selectedJob={selectedJob} item={item} />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
