import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./job.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SideJobCard from "./SideJobCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../Firebase";
import { userContext } from "../../../context/userContext";
function Sidebar({ postAjobBtn, selectedJob, selectedJobfun }) {
  const [allJobs, setJobs] = useState(null);
  const [filteredJobs,setFilteredJobs]=useState(null)
  const [state, dispatch] = useContext(userContext);
  const [search,setSeach]=useState('')
  const fetchAllJobs = async () => {
    // fetch all jobs from jobs collection where employerId is == current user email
    // create a query with this condition (where employerId is == current user email)
    const currentUserId = state.user.email;
    const q = query(
      // collection ref
      collection(db, "jobs"),
      //condition
      where("employerId", "==", currentUserId)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setJobs(jobs);
      setFilteredJobs(jobs)
      console.log(jobs);
    });
    // return ()=>unsubscribe
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);
const filterTheJobs=(e)=>{
  setSeach(e.target.value)
 const jobs=allJobs.filter((item)=>item.jobTitle.toLowerCase().startsWith(e.target.value.toLowerCase()))
 setFilteredJobs(jobs)

}
  return (
    <div>
      <Button className="post-btn" onClick={postAjobBtn}>
        post a job
      </Button>
      <TextField
        size="small"
        value={search}
        onChange={(e)=>filterTheJobs(e)}
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
      {filteredJobs && filteredJobs.length === 0 ? (
        <div>no data</div>
      ) : filteredJobs && filteredJobs.length > 0 ? (
        <div>
          {
          // [
          //   {
          //     jobTitle: "Software Engineer",
          //     createdAt: "2021-09-01T12:00:00.000Z",
          //     jobType: "Full Time",
          //     jobLocation: "Remote",
          //     jobId: "1",
          //   },
           
          // ]
          filteredJobs.map((item, index) => {
            return (
              <SideJobCard
                key={index}
                selectedJobfun={selectedJobfun}
                selectedJob={selectedJob}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Sidebar;
