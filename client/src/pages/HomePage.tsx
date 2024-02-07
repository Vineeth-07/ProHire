import React from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/images/homepage.png";

const HomePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div
        className="bg-white rounded-lg p-6 flex items-center"
        style={{ width: "1000px" }}
      >
        <div className="mr-4" style={{ flex: "1" }}>
          <img src={Icon} alt="icon" />
        </div>
        <div style={{ flex: "1" }}>
          <div>
            <h1 className="text-4xl font-bold text-gray-700 mb-2">ProHire</h1>
            <p className="text-lg text-gray-500">
              Your Gateway to Opportunities. Post, Apply, Succeed. Streamlined
              Hiring, Effortless Applications. ProHire Simplifies Job Search.
            </p>
            <div className="flex mt-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Login
              </Link>
              <Link
                to="/"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
