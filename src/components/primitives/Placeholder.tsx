import type { CSSProperties, ReactNode } from "react";

type PlaceholderProps = {
  label?: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export function Placeholder({
  label = "IMAGE",
  style,
  className = "",
  children,
}: PlaceholderProps) {
  return (
    <div className={`placeholder ${className}`.trim()} style={style}>
      <div className="ph-label">{label}</div>
      {children}
    </div>
  );
}
