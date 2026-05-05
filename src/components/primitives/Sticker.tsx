import type { ReactNode, CSSProperties } from "react";

type Variant = "default" | "solid" | "accent";

type StickerProps = {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
  "data-anim-item"?: boolean;
};

export function Sticker({ children, variant = "default", style, ...rest }: StickerProps) {
  const cls = variant === "default" ? "sticker" : `sticker ${variant}`;
  return (
    <span className={cls} style={style} {...rest}>
      {children}
    </span>
  );
}
