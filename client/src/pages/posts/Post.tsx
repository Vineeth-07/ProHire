import React, { useEffect, useState } from "react";
import PostListItems from "./PostListItems";
import { fetchPostData } from "../../api/PostApi";
import { PostData } from "../../api/PostApi";

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postApi();
  }, []);

  const postApi = async () => {
    try {
      const data = await fetchPostData();
      setPostData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Post;
