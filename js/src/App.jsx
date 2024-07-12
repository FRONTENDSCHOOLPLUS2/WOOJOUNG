import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useRecoilValue } from "recoil";
import { authState } from "@recoil/atoms";

function App() {
  const lgs = useRecoilValue(authState);
  console.log("APP LOGIN INFO", lgs);

  return <RouterProvider router={router} />;
}

export default App;
