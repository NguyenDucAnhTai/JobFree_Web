import ProblemSection from "../../features/landing/components/CaseStudy/ProblemSection";
import Hero from "../../features/landing/components/Hero/Hero";
import PilotSection from "../../features/landing/components/Pilot/PilotSection";
import ProcessSection from "../../features/landing/components/Process/ProcessSection";
import ServicesMarqueeSection from "../../features/landing/components/Services/ServicesMarqueeSection";
import ValuePropsSection from "../../features/landing/components/ValueProps/ValuePropsSection";
import WorkerBenefitsSection from "../../features/landing/components/WorkerBenefits/WorkerBenefitsSection";

export default function HomePage() {
  return (
    <>
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
