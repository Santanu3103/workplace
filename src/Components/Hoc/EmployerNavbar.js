import React from 'react'
import CommonNav from '../Common/CommonNav';

function EmployerNavbar() {
  const pages = [
    {
      name: "Jobs",
      path: "/employee/jobs",
    },
    {
      name: "Applicants",
      path: "/employee/application",
    },
    {
      name: "Conversation",
      path: "/employee/conversation",
    },
    {
      name: "Profile",
      path: "/employee/profile",
    }
  ];
  return (
    <CommonNav pages={pages} />
  );
}

export default EmployerNavbar