import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import CreatePost from "./CreatePost";

const Index: React.FC = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-start-2 col-span-2">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
};

export default Index;
