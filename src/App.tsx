import { Routes } from "react-router-dom";
import PublicRoute from "./routes/public/Public.route";
import ScrollToHash from "./routes/ScrollToHash";

export default function App() {
  return (
    <>
      <ScrollToHash />

      <Routes>{PublicRoute}</Routes>
    </>
  );
}
