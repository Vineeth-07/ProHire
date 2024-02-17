import React from "react";
import SigninForm from "./SigninForm";
import SigninLogo from "../../assets/images/signin.png";

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <img src={SigninLogo} alt="signin" className="mr-7" />
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign in
        </h1>
        <SigninForm />
      </div>
    </div>
  );
};
export default Signin;
