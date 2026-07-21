import ProblemSection from "../components/CaseStudy/ProblemSection";
import Hero from "../components/Hero/Hero";
import PilotSection from "../components/Pilot/PilotSection";
import ProcessSection from "../components/Process/ProcessSection";
import ServicesMarqueeSection from "../components/Services/ServicesMarqueeSection";
import ValuePropsSection from "../components/ValueProps/ValuePropsSection";
import WorkerBenefitsSection from "../components/WorkerBenefits/WorkerBenefitsSection";

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
