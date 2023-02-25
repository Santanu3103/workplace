import React from 'react'
import CommonNav from '../Components/common/CommonNav';

function CandidateNavbar() {
  const pages = [
    {
      name: "Jobs",
      path: "/candidate/jobs",
    },
    {
      name: "Applications",
      path: "/candidate/applications",
    },
    {
      name: "Conversation",
      path: "/candidate/Conversation",
    },
    {
      name: "Profile",
      path: "/candidate/profile",
    }
  ];
  return (
    <CommonNav pages={pages} />
  );
}

export default CandidateNavbar