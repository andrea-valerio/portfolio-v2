"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SmoothHashLinkProps = {
  sectionId: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function SmoothHashLink({ sectionId, href, className, children, onClick }: SmoothHashLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
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
