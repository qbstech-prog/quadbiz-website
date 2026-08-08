"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lazily mounts a map iframe only once it scrolls near the viewport, so the
 * heavy third-party embed never blocks Largest Contentful Paint.
 */
export default function LazyMap({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || show) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full overflow-hidden rounded-card border border-black/10 bg-bg-soft"
    >
      {show ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-grey">
          Loading map…
        </div>
      )}
    </div>
  );
}
