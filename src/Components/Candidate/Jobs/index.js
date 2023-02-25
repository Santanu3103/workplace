import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import JobsCard from "./JobsCard";
import { v4 as uuidv4 } from "uuid";
import { userContext } from "../../../context/userContext";
import toastMessage from "../../../utils/toastMessage";
function Jobs() {
  const [state, dispatch] = useContext(userContext);
  const [Alljobs, setAlljobs] = useState(null);
  const fetchAllJobs = async () => {
    // fetch all jobs from jobs collection
    const q = query(collection(db, "jobs"));
    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      jobs.push(doc.data());
    });
    setAlljobs(jobs);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const applyonJob = async (job) => {
    console.log(job, "job");
    const applicationId = uuidv4();

    // check if user has already applied for the job
    //1 get all the applications from applications collection where candidate id is equal to current user id
    //2 check if any of the application has the same job id as the job id of the job that user is applying for
    //3 if yes then show a toast message saying you have already applied for this job
    // else apply for the job

    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", state.user.email)
    );
    const querySnapshot = await getDocs(q);

    let applications = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      applications.push(doc.data());
    });

    let isApplied = false;
    isApplied = applications.find((application) => {
      if (application.jobId === job.jobId) {
        return true;
      }
    });

    if(isApplied){
      toastMessage("You have already applied for this job", "error");
      return;
    }

    // create a new collection in firestore call applications
    // create a new document in applications collection
    // store job id, candidate id,employer id, and all the relevant data
    // store a status field in the document

    try {
      await setDoc(doc(db, "applications", applicationId), {
        applicationId,
        jobId: job.jobId,
        candidateId: state.user.email,
        employerId: job.employerId,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        createdAt: new Date(),
        candidateName: state.user.displayName,
        experience: state.userInfo.experience,
        resume: state.userInfo.resume,
        expectedSalary: state.userInfo.expectedSalary,
        status: "pending",
      });
      toastMessage("Applied successfully", "success");
    } catch (err) {
      console.log(err);
      toastMessage("Something went wrong", "error");
    }
  };
  return Alljobs && Alljobs.length === 0 ? (
    <div>no data</div>
  ) : Alljobs && Alljobs.length > 0 ? (
    <div>
      {Alljobs.map((job) => {
        return <JobsCard job={job} key={job.jobId} applyonJob={applyonJob} />;
      })}
    </div>
  ) : (
    <div>loading</div>
  );
}

export default Jobs;
