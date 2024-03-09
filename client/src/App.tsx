import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./i18n";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
