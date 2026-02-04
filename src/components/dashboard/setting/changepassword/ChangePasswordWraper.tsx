import React from "react";
import UserSidebar from "../detailsChange/common/UserSidebar";
import ChangePasswordContainer from "./ChangePasswordContainer";

const ChangePasswordWraper = () => {
  return (
    <div className="flex gap-10  ">
      <UserSidebar />
      <ChangePasswordContainer />
    </div>
  );
};

export default ChangePasswordWraper;
