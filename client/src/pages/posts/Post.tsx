import React, { useEffect, useState } from "react";
import PostListItems from "./PostListItems";
import { API_ENDPOINT } from "../../config/constants";

const Post: React.FC = () => {
  const [postData, setPostData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPostData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {loading ? (
          <div>Loading...</div>
        ) : postData.length === 0 ? (
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "30px",
              fontFamily: "cursive",
            }}
          >
            No posts available
          </p>
        ) : (
          <PostListItems postData={postData} />
        )}
      </div>
    </>
  );
};

export default Post;
