import React from 'react'
import CommonNav from '../Common/CommonNav';

function CandidateNavbar() {
  const pages = [
    {
      name: "Jobs",
      path: "/candidate/jobs",
    },
    {
      name: "Applications",
      path: "/candidate/application",
    },
    {
      name: "Conversation",
      path: "/candidate/conversation",
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