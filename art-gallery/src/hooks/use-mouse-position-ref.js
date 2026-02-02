import { useRef, useEffect } from "react";

/**
 * Hook to track mouse position relative to a container element
 * Returns a ref that holds the current mouse position
 */
export function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      positionRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
    };

    const handleMouseLeave = () => {
      positionRef.current = { x: 0, y: 0 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return positionRef;
}
