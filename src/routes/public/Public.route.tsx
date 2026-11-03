import { Outlet, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import {
  AboutPage,
  BlogArticlePage,
  BlogPage,
  ContactPage,
  EmployersPage,
  HomePage,
  HowItWorksPage,
  JobCategoriesPage,
  JobCategoryDetailPage,
  PricingPage,
  FaqPage,
  PartnersPage,
  WorkersPage,
} from "../../pages/public";
import { ROUTER_URL } from "../router.const";

const PublicRoute = (
  <>
    <Route
      element={
        <MainLayout>
          <Outlet />
        </MainLayout>
      }
    >
      <Route path={ROUTER_URL.PUBLIC.HOME} element={<HomePage />} />
      <Route path={ROUTER_URL.PUBLIC.ABOUT} element={<AboutPage />} />
      <Route path={ROUTER_URL.PUBLIC.EMPLOYERS} element={<EmployersPage />} />
      <Route path={ROUTER_URL.PUBLIC.WORKERS} element={<WorkersPage />} />
      <Route
        path={ROUTER_URL.PUBLIC.HOW_IT_WORKS}
        element={<HowItWorksPage />}
      />
      <Route path={ROUTER_URL.PUBLIC.CONTACT} element={<ContactPage />} />
      <Route
        path={ROUTER_URL.PUBLIC.JOB_CATEGORIES}
        element={<JobCategoriesPage />}
      />
      <Route
        path={ROUTER_URL.PUBLIC.JOB_CATEGORY}
        element={<JobCategoryDetailPage />}
      />
      <Route path={ROUTER_URL.PUBLIC.PRICING} element={<PricingPage />} />
      <Route path={ROUTER_URL.PUBLIC.FAQ} element={<FaqPage />} />
      <Route path={ROUTER_URL.PUBLIC.BLOG} element={<BlogPage />} />
      <Route
        path={ROUTER_URL.PUBLIC.BLOG_ARTICLE}
        element={<BlogArticlePage />}
      />
      <Route path={ROUTER_URL.PUBLIC.PARTNERS} element={<PartnersPage />} />
      <Route path="*" element={<HomePage />} />
    </Route>
  </>
);

export default PublicRoute;
