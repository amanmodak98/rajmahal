"use client";

import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { EASE } from "@/lib/motion";

type Common = {
  label: string;
  className?: string;
  intensity?: number;
};

/**
 * Magnetic button - cursor-driven subtle pull, scale on hover.
 * No useState for mouse coords (avoids re-render storms). Uses Motion values only.
 */
export function MagneticLink({
  href,
  label,
  className,
  intensity = 0.28,
  external = false,
}: Common & { href: string; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    x.set(px * intensity);
    y.set(py * intensity);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      style={{ x: sx, y: sy }}
      transition={{ duration: 0.6, ease: [...EASE.parchment] }}
      className={className}
    >
      {label}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}

export function MagneticButton({
  onClick,
  label,
  className,
  intensity = 0.32,
  type = "button",
}: Common & { onClick?: () => void; type?: "button" | "submit" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw === true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    x.set(px * intensity);
    y.set(py * intensity);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      style={{ x: sx, y: sy }}
      transition={{ duration: 0.6, ease: [...EASE.parchment] }}
      className={className}
    >
      {label}
    </motion.button>
  );
}
