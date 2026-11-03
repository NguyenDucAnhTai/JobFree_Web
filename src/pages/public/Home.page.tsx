import ProblemSection from "../../components/CaseStudy/ProblemSection";
import Hero from "../../components/Hero/Hero";
import PilotSection from "../../components/Pilot/PilotSection";
import ProcessSection from "../../components/Process/ProcessSection";
import ServicesMarqueeSection from "../../components/Services/ServicesMarqueeSection";
import ValuePropsSection from "../../components/ValueProps/ValuePropsSection";
import WorkerBenefitsSection from "../../components/WorkerBenefits/WorkerBenefitsSection";
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
