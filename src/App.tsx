import { Route, Routes, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ScrollToHash from "./routes/ScrollToHash";

export default function App() {
  return (
    <>
      <ScrollToHash />

      <Routes>
        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}
