import React from "react";
import UserSidebar from "./common/UserSidebar";
import UserDetailsContainer from "./container/UserDetailsContainer";

const InformationChangeWraper = () => {
  return (
    <div className="flex gap-10  ">
      <UserSidebar />
      <UserDetailsContainer />
    </div>
  );
};

export default InformationChangeWraper;
