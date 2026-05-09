"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

type SmoothHashLinkProps = {
  sectionId: string;
  href: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
};

export function SmoothHashLink({ sectionId, href, className, style, children, onClick }: SmoothHashLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      style={style}
      scroll={false}
      onClick={(e) => {
        onClick?.();
        if (pathname !== "/") return;
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${sectionId}`);
      }}
    >
      {children}
    </Link>
  );
}
