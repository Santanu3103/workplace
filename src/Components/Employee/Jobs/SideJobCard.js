import { Divider } from "@mui/material";
import React from "react";

function SideJobCard({ selectedJob, item, selectedJobfun }) {
  const { jobTitle, createdAt, jobType, jobLocation, jobId } = item;
  return (
    <div
      className={`sideJobCard ${
        selectedJob && selectedJob.jobId === jobId && "sideJobCard-select"
      } `}
      onClick={() => selectedJobfun(item)}
    >
      <h4>{createdAt}</h4>
      <h1>{jobTitle}</h1>
      <h2>{jobLocation}</h2>
      <h3>{jobType}</h3>
      <Divider />
    </div>
  );
}
// sideJobCard-select
export default SideJobCard;
