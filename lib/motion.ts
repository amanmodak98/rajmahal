/* ============================================================
   RAJ MAHAL ROORKEE - MOTION TOKENS
   Shared easing curves, staggers, and motion constants
   ============================================================ */

import type { Transition, Easing } from "motion/react";

/* ----- Easing curves (CSS cubic-beziers) ----- */
export const EASE = {
  imperial: [0.86, 0, 0.07, 1] as const,    // big reveals, hero motion
  ember: [0.32, 0.72, 0, 1] as const,        // buttons, hover
  parchment: [0.16, 1, 0.3, 1] as const,     // entry fade-up
  smooth: [0.45, 0, 0.15, 1] as const,       // generic smooth
} satisfies Record<string, Easing>;

/* ----- Spring / spring-like Motion transitions ----- */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 110,
  damping: 22,
  mass: 1,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 28,
  mass: 1,
};

export const SPRING_FIRM: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 26,
  mass: 0.8,
};

/* ----- Stagger orchestration ----- */
export const STAGGER = {
  fast: 0.04,
  normal: 0.08,
  slow: 0.14,
};

/* ----- Durations ----- */
export const DUR = {
  instant: 0.2,
  fast: 0.45,
  normal: 0.75,
  slow: 1.4,
  hero: 2.2,
};

/* ----- Magnetic physics ----- */
export const MAGNETIC = {
  strength: 0.28,
  threshold: 0.5,
  scaleOnHover: 1.04,
};

/* ----- GSAP easing string aliases (for ScrollTrigger) ----- */
export const GSAP_EASE = {
  imperial: "power4.inOut",
  ember: "power3.out",
  parchment: "expo.out",
  cinematic: "expo.inOut",
};

/* ----- Z-index system ----- */
export const Z = {
  base: 0,
  content: 10,
  surface: 20,
  nav: 40,
  overlay: 50,
  grain: 60,
  cursor: 70,
  modal: 80,
} as const;

/* ----- Corner radius tokens (locked system) ----- */
export const RADIUS = {
  card: 28,
  pill: 9999,
  input: 16,
  inner: 22,
} as const;

/* ----- Three Motion preset containers (used by FadeUp etc.) ----- */
export const fadeUpInitial = { opacity: 0, y: 32, filter: "blur(8px)" };
export const fadeUpAnimate = { opacity: 1, y: 0, filter: "blur(0px)" };
