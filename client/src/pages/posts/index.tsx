import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Index: React.FC = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-start-2 col-span-2">
        <CreatePost />
        <Post />
      </div>
    </div>
  );
};

export default Index;
