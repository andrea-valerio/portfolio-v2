import { Hero } from "@/components/landing/Hero";
import { RoleStrip } from "@/components/landing/RoleStrip";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { PublicationsSection } from "@/components/landing/PublicationsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <RoleStrip />
      <ProjectsSection />
      <PublicationsSection />
    </>
  );
}
