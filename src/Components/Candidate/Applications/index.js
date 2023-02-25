import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../Firebase";
import CommonTable from "../../common/CommonTable";

const columns = [
  {
    label: "Company ",
    datakey:'companyName',
    style:{
      width: '25%'
    }
  },
  {
    label: "Job Title",
    datakey:'jobTitle',
    style:{

      width: '25%'
    }
  },
  {
    label: "Intrest shown",
    datakey:'createdAt',
    type: "date",
    style:{
      width: '25%'
    }
  },
  {
    label: "Status",
    datakey:'status',
    style:{
      width: '25%'
    }
  },
];

function Applications() {
  const [state, dispatch] = useContext(userContext);
  const [applications, setApplications] = useState(null);
  const fetchAllApplications = async () => {
    // fetch all applications from applications collection where candidate id is equal to current user id
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", state.user.email)
    );
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      a.push(doc.data());
    });
    setApplications(a);
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);
  return applications && applications.length === 0 ? (
    <div className="text-center">No Applications</div>
  ) : applications && applications.length > 0 ? (
    <CommonTable columns={columns} data={applications} />
  ) : (
    <div className="text-center">Loading...</div>
  );
}

export default Applications;
