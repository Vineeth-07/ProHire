import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from "react";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
