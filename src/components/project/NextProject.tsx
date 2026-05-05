import Link from "next/link";
import type { ProjectCaseStudy } from "@/lib/projects";

export function NextProject({ data }: { data: ProjectCaseStudy }) {
  return (
    <section style={{ padding: "80px 48px 120px", maxWidth: 1440, margin: "0 auto" }}>
      <div className="rule" style={{ marginBottom: 48 }} />
      <Link href={`/projects/${data.nextSlug}/`} style={{ display: "block" }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: "0.2em", opacity: 0.6, marginBottom: 12 }}>
          ━━ NEXT PROJECT
        </div>
        <h3
          className="display-wide"
          data-anim="section-title"
          style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
        >
          {data.nextTitle}
        </h3>
      </Link>
    </section>
  );
}
