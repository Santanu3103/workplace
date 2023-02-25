import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../Firebase";
import { v4 as uuidv4 } from "uuid";
import CommonTable from "../../common/CommonTable";
import toastMessage from "../../../utils/toastMessage";
const columns = [
  {
    label: "Name",
    datakey: "candidateName",
    style: {
      width: "20%",
    },
  },
  {
    label: "Job Title",
    datakey: "jobTitle",
    style: {
      width: "10%",
    },
  },
  {
    label: "Experience",
    datakey: "experience",
    style: {
      width: "15%",
    },
  },
  {
    label: "Expected Salary",
    datakey: "expectedSalary",
    style: {
      width: "20%",
    },
  },
  {
    label: "Resume",
    datakey: "resume",
    type: "url",
    style: {
      width: "5%",
    },
  },
  {
    label: "Action",
    type: "action",
    style: {
      width: "30%",
    },
  },
];

function Applicants() {
  const [state, dispatch] = useContext(userContext);
  const [applications, setApplications] = useState(null);
  const fetchAllApplications = async () => {
    // fetch all applications from applications collection where candidate id is equal to current user id
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", state.user.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let a = [];
      querySnapshot.forEach((doc) => {
        a.push(doc.data());
      });
      setApplications(a);
    });
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.data());
    //   a.push(doc.data());
    // });
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);
  const btnAction = async (data, type) => {
    if (type === "reject") {
      try {
        const docRef = doc(db, "applications", data.applicationId);
        await deleteDoc(docRef);
        toastMessage("Application Rejected", "success");
      } catch (e) {
        console.log(e);
        toastMessage("Something went wrong", "error");
      }
      // delete application from applications collection
      // where the document id is equal to data.applicationId
    } else {
      
      console.log("accept", data);

      //1. update application status to accepted
      // call firebase firestore application collection to update the status of the doc where the document id is equal to data.applicationId

      await setDoc(
        doc(db, "applications", data.applicationId),
        {
          status: "accepted",
        },
        { merge: true }
      );
      try {
        // 2. create a new document in last message collection 
        //    which will be used to show the last messages in the chat
        //  it will have a unique conversationkey which we will use to fetch all one to one messages
        //  between current user and the select user fro a accepted job role from the conversation collection
        const lastMessageId = uuidv4();
        const message = `hey ${data.candidateName}, we have accepted your job application for ${data.jobTitle}`;
        const conversationKey = uuidv4();
        await setDoc(doc(db, "last_messages", lastMessageId), {
          candidateId: data.candidateId,
          employerId: data.employerId,
          employerName: data.companyName,
          candidateName: data.candidateName,
          createdAt: new Date(),
          message,
          conversationKey,
          lastMessageId
        });

        // 3. create a doc in conversation collection with the conversation key
        const convId = uuidv4();
        await setDoc(doc(db, "conversations", convId), {
          conversationKey,
          convId,
          userId: state.user.email,
          createdAt: new Date(),
          message,
        });
        toastMessage("Application Accepted", "success");
      } catch (e) {
        console.log(e);
        toastMessage("Something went wrong", "error");
      }
    }
  };
  return applications && applications.length === 0 ? (
    <div className="text-center">No Applications</div>
  ) : applications && applications.length > 0 ? (
    <CommonTable columns={columns} data={applications} btnAction={btnAction} />
  ) : (
    <div className="text-center">Loading...</div>
  );
}

export default Applicants;
