import { Route } from "react-router-dom";
import { PublicLayout } from "../../layouts";
import { AboutPage, ForbiddenPage, HomePage } from "../../pages/public";
import { ROUTER_URL } from "../router.const";

export default function PublicRoute() {
  return (
    <Route element={<PublicLayout />}>
      <Route path={ROUTER_URL.PUBLIC.HOME} element={<HomePage />} />
      <Route path={ROUTER_URL.PUBLIC.ABOUT} element={<AboutPage />} />
      <Route path={ROUTER_URL.FORBIDDEN} element={<ForbiddenPage />} />
      <Route path="*" element={<HomePage />} />
    </Route>
  );
}
