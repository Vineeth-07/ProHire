import React from "react";
import { Link } from "react-router-dom";
import AccountLayout from "../../layouts/account";

const Dashboard: React.FC = () => {
  return (
    <div className="static min-h-screen flex-row justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <AccountLayout />
    </div>
  );
};

export default Dashboard;
