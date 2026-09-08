import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export default function Section({
  children,
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`relative w-full py-section-y ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
