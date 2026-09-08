import { Suspense } from "react";
import { Routes } from "react-router-dom";
import { AuthInitializer } from "./features/auth";
import LoadingLayout from "./layouts/Loading.layout";
import {
  AdminDataRoute,
  AdminSystemRoute,
  AuthRoute,
  CustomerSupportRoute,
  PublicRoute,
} from "./routes";
import ScrollToHash from "./routes/ScrollToHash";

export default function App() {
  return (
    <>
      <AuthInitializer />
      <ScrollToHash />

      <Suspense fallback={<LoadingLayout />}>
        <Routes>
          {PublicRoute()}
          {AuthRoute()}
          {AdminSystemRoute()}
          {AdminDataRoute()}
          {CustomerSupportRoute()}
        </Routes>
      </Suspense>
    </>
  );
}
