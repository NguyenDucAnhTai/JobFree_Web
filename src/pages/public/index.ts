import { lazy } from "react";

export { default as AboutPage } from "./About.page";
export { default as PartnersPage } from "./Partners.page";
export const BlogPage = lazy(() => import("./Blog.page"));
export const BlogArticlePage = lazy(() => import("./BlogArticle.page"));
export { default as HomePage } from "./Home.page";
export { default as EmployersPage } from "./Employers.page";
export { default as WorkersPage } from "./Workers.page";
export { default as HowItWorksPage } from "./HowItWorks.page";
export { default as ContactPage } from "./Contact.page";
export { default as JobCategoriesPage } from "./JobCategories.page";
export { default as JobCategoryDetailPage } from "./JobCategoryDetail.page";
export const PricingPage = lazy(() => import("./Pricing.page"));
export const FaqPage = lazy(() => import("./Faq.page"));
