"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { useGesture } from "@use-gesture/react";
import { animated, useSpring } from "react-spring";

import type { LightboxImage } from "./Lightbox";

type Props = {
  image: LightboxImage;
  isActive: boolean;
  onZoomChange: (zoomed: boolean) => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2;
const SPRING_CONFIG = { tension: 300, friction: 30 };
const ZOOM_EPSILON = 1.001;

type PinchMemo = { pLocalX: number; pLocalY: number };

export function LightboxSlide({ image, isActive, onZoomChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastZoomedRef = useRef(false);

  const [{ scale, x, y }, api] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    config: SPRING_CONFIG,
  }));

  const reportZoom = (s: number) => {
    const zoomed = s > ZOOM_EPSILON;
    if (zoomed !== lastZoomedRef.current) {
      lastZoomedRef.current = zoomed;
      onZoomChange(zoomed);
    }
  };

  // Pan bounds use the actual rendered image rect (object-fit: contain),
  // so the user can't pan past the image's visible edges.
  const computeBounds = (s: number) => {
    const el = containerRef.current;
    if (!el) return { maxX: 0, maxY: 0 };
    const rect = el.getBoundingClientRect();
    const containerW = rect.width;
    const containerH = rect.height;
    if (containerW === 0 || containerH === 0) return { maxX: 0, maxY: 0 };
    const imageRatio = image.src.width / image.src.height;
    const containerRatio = containerW / containerH;
    let imgW: number;
    let imgH: number;
    if (imageRatio > containerRatio) {
      imgW = containerW;
      imgH = containerW / imageRatio;
    } else {
      imgH = containerH;
      imgW = containerH * imageRatio;
    }
    const maxX = Math.max(0, (s * imgW - containerW) / 2);
    const maxY = Math.max(0, (s * imgH - containerH) / 2);
    return { maxX, maxY };
  };

  const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

  useEffect(() => {
    if (!isActive) {
      api.start({ scale: 1, x: 0, y: 0, immediate: true });
      if (lastZoomedRef.current) {
        lastZoomedRef.current = false;
        onZoomChange(false);
      }
    }
  }, [isActive, api, onZoomChange]);

  useGesture(
    {
      onPinch: ({ origin: [ox, oy], first, offset: [s], memo, event }) => {
        const el = containerRef.current;
        if (!el) return memo;
        // Block native browser zoom (esp. trackpad ctrl+wheel) where allowed.
        if (event && "preventDefault" in event && event.cancelable) {
          event.preventDefault();
        }
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        let m = memo as PinchMemo | undefined;
        if (first || !m) {
          const s0 = scale.get();
          const tx0 = x.get();
          const ty0 = y.get();
          m = {
            pLocalX: (ox - cx - tx0) / s0,
            pLocalY: (oy - cy - ty0) / s0,
          };
          // Tell parent we're zoomed as soon as pinch starts so Embla blocks
          // any subsequent drag attempt.
          if (!lastZoomedRef.current) {
            lastZoomedRef.current = true;
            onZoomChange(true);
          }
        }

        // Anchor the pinch to the finger midpoint: keep the image-local point
        // captured at gesture start under the current origin as scale changes.
        const txNew = ox - cx - s * m.pLocalX;
        const tyNew = oy - cy - s * m.pLocalY;

        const { maxX, maxY } = computeBounds(s);
        api.start({
          scale: s,
          x: clamp(txNew, maxX),
          y: clamp(tyNew, maxY),
          immediate: true,
        });
        reportZoom(s);
        return m;
      },
      onPinchEnd: ({ offset: [s] }) => {
        const finalScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
        const { maxX, maxY } = computeBounds(finalScale);
        api.start({
          scale: finalScale,
          x: clamp(x.get(), maxX),
          y: clamp(y.get(), maxY),
          config: SPRING_CONFIG,
        });
        reportZoom(finalScale);
      },
      onDrag: ({ offset: [ox, oy], cancel, pinching }) => {
        if (pinching) {
          cancel();
          return;
        }
        // At scale 1 we want Embla to handle the swipe; do nothing.
        if (scale.get() <= ZOOM_EPSILON) return;
        const s = scale.get();
        const { maxX, maxY } = computeBounds(s);
        api.start({
          x: clamp(ox, maxX),
          y: clamp(oy, maxY),
          immediate: true,
        });
      },
      onDragEnd: () => {
        if (scale.get() <= ZOOM_EPSILON) return;
        const s = scale.get();
        const { maxX, maxY } = computeBounds(s);
        api.start({
          x: clamp(x.get(), maxX),
          y: clamp(y.get(), maxY),
          config: SPRING_CONFIG,
        });
      },
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      drag: {
        from: () => [x.get(), y.get()],
        filterTaps: true,
      },
      pinch: {
        scaleBounds: { min: MIN_SCALE, max: MAX_SCALE },
        rubberband: true,
        from: () => [scale.get(), 0],
      },
    },
  );

  const handleDoubleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const currentScale = scale.get();
    if (currentScale > ZOOM_EPSILON) {
      api.start({ scale: 1, x: 0, y: 0, config: SPRING_CONFIG });
      reportZoom(1);
      return;
    }

    const target = DOUBLE_TAP_SCALE;
    const pLocalX = e.clientX - cx;
    const pLocalY = e.clientY - cy;
    // For s_old = 1, p_local in element coords equals the click offset from
    // center in screen coords; the new translate keeps that point under the
    // cursor: t_new = -(s_new - 1) * p_local.
    const txNew = -(target - 1) * pLocalX;
    const tyNew = -(target - 1) * pLocalY;
    const { maxX, maxY } = computeBounds(target);
    api.start({
      scale: target,
      x: clamp(txNew, maxX),
      y: clamp(tyNew, maxY),
      config: SPRING_CONFIG,
    });
    reportZoom(target);
  };

  return (
    <div
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
      style={{
        flex: "0 0 100%",
        minWidth: 0,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        touchAction: "none",
        overflow: "hidden",
      }}
    >
      <animated.div
        style={{
          flex: "1 1 0%",
          minHeight: 0,
          width: "100%",
          height: "100%",
          scale,
          x,
          y,
          willChange: "transform",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          sizes="80vw"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            background: "transparent",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </animated.div>
    </div>
  );
}
