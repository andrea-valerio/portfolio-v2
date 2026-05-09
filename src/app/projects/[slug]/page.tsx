import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PROJECTS_DATA, ALL_SLUGS, type ProjectSlug } from "@/lib/projects";
import { ProjectHero } from "@/components/project/ProjectHero";
import { NextProject } from "@/components/project/NextProject";
import { ProjectClient } from "@/components/project/ProjectClient";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = PROJECTS_DATA[slug as ProjectSlug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.subtitle,
    openGraph: {
      title: `${data.title} – Andrea Valerio`,
      description: data.subtitle,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = PROJECTS_DATA[slug as ProjectSlug];
  if (!data) notFound();

  return (
    <>
      <ProjectHero data={data} />
      <ProjectClient data={data} />
      <NextProject data={data} />
    </>
  );
}
