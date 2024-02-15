import React from "react";
import AccountLayout from "../../layouts/account";
import Post from "../posts/index";

const Dashboard: React.FC = () => {
  return (
    <div className="static min-h-screen flex-row justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      {/* test */}
      <AccountLayout />
      <Post />
    </div>
  );
};

export default Dashboard;
