import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import maleIcon from "../../assets/images/male.png";
import femaleIcon from "../../assets/images/female.png";
import AccountLayout from "../../layouts/account";
import { UserData, fetchUserData } from "../../api/UserApi";
import UserPosts from "./UserPosts";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [loggedinUser, setLoggedinUser] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("posts");

  useEffect(() => {
    const fetchLoggedinUser = async () => {
      try {
        const data = await fetchUserData();
        const userDataArray = Object.values(data);
        setLoggedinUser(userDataArray);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLoggedinUser();
  }, []);

  const currentUser = loggedinUser[0];

  return (
    <div className="static min-h-screen flex-row justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <AccountLayout />
      {loading ? (
        <div className="grid grid-cols-4">
          <div className="col-start-2 col-span-2 bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          <div className="col-start-2 col-span-2 bg-white rounded-lg p-6 shadow-md">
            <p className="text-2xl font-bold text-center mb-3">
              {t("Profile")}
            </p>
            {currentUser && (
              <>
                <div className="flex items-center mb-4">
                  {currentUser.gender === "male" && (
                    <img src={maleIcon} alt="Male" className="w-8 h-8 mr-2" />
                  )}
                  {currentUser.gender === "female" && (
                    <img
                      src={femaleIcon}
                      alt="Female"
                      className="w-8 h-8 mr-2"
                    />
                  )}
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                </div>
                <div>
                  <p className="font-semibold">
                    {t("Gender")}: {currentUser.gender}
                  </p>
                  <p className="font-semibold">
                    {t("Qualification")}: {currentUser.qualification}
                  </p>
                  <p className="font-semibold">
                    {t("Email")}: {currentUser.email}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="col-start-2 col-span-2">
            <div className="col-start-2 col-span-2">
              <div className="flex justify-between mt-4">
                <button
                  className={`text-lg font-semibold px-4 py-2 rounded focus:outline-none ${
                    activeSection === "posts"
                      ? "bg-purple-600 text-white"
                      : "text-white hover:bg-gray-200 hover:text-gray-800"
                  } transition-colors duration-300`}
                  onClick={() => setActiveSection("posts")}
                >
                  {t("Posts")}
                </button>
                <button
                  className={`text-lg font-semibold px-4 py-2 rounded focus:outline-none ${
                    activeSection === "saved"
                      ? "bg-purple-600 text-white"
                      : "text-white hover:bg-gray-200 hover:text-gray-800"
                  } transition-colors duration-300`}
                  onClick={() => setActiveSection("saved")}
                >
                  {t("Saved")}
                </button>
                <button
                  className={`text-lg font-semibold px-4 py-2 rounded focus:outline-none ${
                    activeSection === "applied"
                      ? "bg-purple-600 text-white"
                      : "text-white hover:bg-gray-200 hover:text-gray-800"
                  } transition-colors duration-300`}
                  onClick={() => setActiveSection("applied")}
                >
                  {t("Applied")}
                </button>
              </div>
            </div>
            <UserPosts currentUser={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
