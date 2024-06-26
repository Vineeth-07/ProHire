import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import maleIcon from "../../assets/images/male.png";
import femaleIcon from "../../assets/images/female.png";
import { fetchUserPosts } from "../../api/PostApi";
import { PostData } from "../../api/PostApi";
import { UserData, fetchAllUsers } from "../../api/UserApi";
import CommentBox from "../comments/CommentBox";

interface UserPostsProps {
  currentUser: UserData;
}

const UserPosts: React.FC<UserPostsProps> = ({ currentUser }) => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDialogMap, setShowDialogMap] = useState<{
    [postId: number]: boolean;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userApi();
    userPostsData();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const userApi = async () => {
    try {
      const data = await fetchAllUsers();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const userPostsData = async () => {
    try {
      const data = await fetchUserPosts();
      setUserPosts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const toggleDialog = (postId: number) => {
    setShowDialogMap((prevMap) => ({
      ...prevMap,
      [postId]: !prevMap[postId],
    }));
  };

  const getTimeDifference = (postDate: string) => {
    const postDateTime = new Date(postDate);
    const timeDifference = currentTime.getTime() - postDateTime.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);

    if (weeksDifference > 0) {
      return `${weeksDifference} week${weeksDifference > 1 ? "s" : ""} ago`;
    } else if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return `${secondsDifference} second${
        secondsDifference > 1 ? "s" : ""
      } ago`;
    }
  };
  return (
    <>
      {userPosts.map((post: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "800px",
              margin: "20px auto 0",
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  {currentUser && (
                    <img
                      src={
                        currentUser.gender === "male" ? maleIcon : femaleIcon
                      }
                      alt="icon"
                      className="h-12 w-12 mr"
                    />
                  )}
                </div>
                <div>
                  {currentUser && (
                    <>
                      <h3 style={{ marginBottom: "3px" }}>
                        {currentUser.name}
                      </h3>
                      <p style={{ fontSize: "0.8rem" }}>
                        {getTimeDifference(post.date)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li
                style={{
                  background: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  style={{
                    marginBottom: "10px",
                    color: "blueviolet",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {post.title}
                </h2>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Company")}:
                  </span>
                  {post.company}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Description")}:
                  </span>
                  {post.description}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Deadline")}:
                  </span>
                  {new Date(post.deadline).toLocaleDateString("en-US")}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Location")}:
                  </span>
                  {post.location}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Salary")}:
                  </span>
                  {post.salary}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="text-gray-800 font-bold mr-1">
                    {t("Experience")}:
                  </span>
                  {post.experience}
                </p>
                <p className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span
                    style={{ cursor: "pointer", color: "blue" }}
                    className="text-gray-800 font-bold mr-1"
                    onClick={() => setShowModal(true)}
                  >
                    Applicants:
                  </span>
                  {post.applications.length}
                  {/* {userData} */}
                </p>
              </li>
            </ul>
            <div>
              {showModal && (
                <div
                  style={{
                    position: "fixed",
                    zIndex: 1,
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      width: "50%",
                      border: "1px solid black",
                    }}
                  >
                    <span
                      style={{
                        float: "right",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                      onClick={() => setShowModal(false)}
                    >
                      &times;
                    </span>
                    <h2
                      style={{
                        marginBottom: "5px",
                        color: "black",
                        fontSize: "30px",
                        textAlign: "center",
                      }}
                    >
                      Applicants
                    </h2>
                    <div>
                      <ul>
                        {userData.map((user) => (
                          <li key={user.id}>
                            {"Name: "}
                            {post.applications[user.id]
                              ? user.name
                              : "Unknown User"}
                            {" Email: "}
                            {post.applications[user.id]
                              ? user.email
                              : "Unknown email"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <div
                className="flex items-center space-x-1"
                style={{ cursor: "pointer" }}
                onClick={() => toggleDialog(post.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span>{t("Comment")}</span>
              </div>
            </div>
            {showDialogMap[post.id] && (
              <CommentBox post={post} user={currentUser} allUsers={userData} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default UserPosts;
