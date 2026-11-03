import ProblemSection from "../../features/landing/components/CaseStudy/ProblemSection";
import Hero from "../../features/landing/components/Hero/Hero";
import PilotSection from "../../features/landing/components/Pilot/PilotSection";
import ProcessSection from "../../features/landing/components/Process/ProcessSection";
import ServicesMarqueeSection from "../../features/landing/components/Services/ServicesMarqueeSection";
import ValuePropsSection from "../../features/landing/components/ValueProps/ValuePropsSection";
import WorkerBenefitsSection from "../../features/landing/components/WorkerBenefits/WorkerBenefitsSection";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

export default function HomePage() {
  return (
    <>
      <PublicPageMeta
        title="JobFree — Điều phối nhân sự ca ngắn rõ ràng"
        description="JobFree giúp Employer mô tả, theo dõi và xác nhận công việc ca ngắn với thông tin rõ cho cả Employer và Worker."
        canonicalPath="/"
      />
      <Hero />
      <ProblemSection />
      <ValuePropsSection />
      <ProcessSection />
      <WorkerBenefitsSection />
      <ServicesMarqueeSection />
      <PilotSection />
    </>
  );
}
