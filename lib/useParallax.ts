"use client";

import { useScroll, useMotionValue } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/**
 * A parallax helper that returns a CSS `translate3d(...)` string.
 *
 * Why this exists instead of `<motion.div style={{ y: motionValue }}>`:
 *   The latter routes the transform through Motion's internal proxy and the
 *   MotionValue. When React 19 strict mode runs an extra mount/commit pass,
 *   the proxy and React disagree on the final DOM ordering, and React throws
 *   `removeChild: not a child of this node`. The shallow `useState`-driven
 *   transform below is plain CSS, so Motion never touches the DOM node and
 *   React's commit phase stays consistent.
 *
 *   `useMotionValue` from motion/react is still used internally to subscribe
 *   to the same scroll-progress stream; only the DOM patch is rerouted through
 *   React state.
 */
export function useParallaxY(
  ref: RefObject<HTMLElement | null>,
  range: number = 60,
): string {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => y.set(v * range * 2 - range));
  }, [scrollYProgress, range, y]);

  // `y.get()` reads the latest MotionValue without re-rendering, and React
  // re-renders only when scrollYProgress actually changes (via setY below).
  const [tx, setTx] = useState(`translate3d(0, ${y.get()}px, 0)`);
  useEffect(() => {
    return y.on("change", (v) => setTx(`translate3d(0, ${v}px, 0)`));
  }, [y]);

  return tx;
}
