import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ScrollToHash from "./routes/ScrollToHash";

export default function App() {
  return (
    <>
      <ScrollToHash />

      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MainLayout>
    </>
  );
}
