import React from 'react'
import CommonNav from '../Components/common/CommonNav';

function EmployerNavbar() {
  const pages = [
    {
      name: "Jobs",
      path: "/employer/job",
    },
    {
      name: "Applicants",
      path: "/employer/applicants",
    },
    {
      name: "Conversation",
      path: "/employer/Conversation",
    },
    {
      name: "Profile",
      path: "/employer/profile",
    }
  ];
  return (
    <CommonNav pages={pages} />
  );
}

export default EmployerNavbar