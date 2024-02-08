import React, { useEffect, useState } from "react";
import PostListItems from "./PostListItems";

const Post: React.FC = () => {
  const [postData, setPostData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/post");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return <PostListItems postData={postData} />;
};

export default Post;
