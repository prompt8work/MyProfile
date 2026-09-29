import type { CSSProperties } from "react";
import type { Transition, Variants } from "framer-motion";

/**
 * The single source of truth for every animation on the site.
 *
 * Nothing outside this file may hard-code a duration, easing or distance.
 * framer-motion components read the constants/variants below directly;
 * CSS-only effects (hover lifts, the hero word reveal, view transitions)
 * read the same numbers through `motionCssVars`, which the root layout
 * sets on <html> — so both engines always agree.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The one exception to EASE: seamless loops and timers (the moving AI Lab
 * grid, the carousel's progress fill, the nav progress trickle) must run at
 * constant speed, or they visibly stutter at each cycle boundary.
 */
export const LOOP_EASE = "linear" as const;

/** Seconds. */
export const DURATION = {
  hover: 0.2,
  press: 0.09,
  reveal: 0.55,
  page: 0.38,
  morph: 0.56,
  mediaZoom: 0.9,
  countUp: 1.5,
  navProgress: 0.38,
  navTrickle: 8,
  heroCurtain: 1.1,
  blobLoop: 20,
  roleRotate: 2.6,
  carouselInterval: 5,
  copiedFor: 1.8,
  shake: 0.4,
  checkDraw: 0.5,
} as const;

/** Pixels unless noted. */
export const DISTANCE = {
  revealRise: 16,
  timelineSlide: 40,
  liftCard: -4,
  liftButton: -2,
  arrowNudge: 4,
  carouselSlide: 28,
  menuDrop: -8,
  shake: 6,
  burst: 22,
  swipe: 50,
  blobDrift: 36,
  labelFloat: -9,
} as const;

/** Unitless scale factors. */
export const SCALE = {
  press: 0.97,
  pressCard: 0.99,
  mediaZoom: 1.06,
  markerActive: 1.1,
  pop: 1.25,
  blob: 1.08,
  labelFloat: 0.78,
} as const;

/** How far a carousel slide follows the finger past its bounds (0 = rigid). */
export const DRAG_ELASTIC = 0.2;

export const STAGGER = {
  gap: 0.07,
  firstDelay: 0,
  word: 0.055,
} as const;

/** Viewport rule for every scroll-triggered reveal. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const transition = {
  reveal: { duration: DURATION.reveal, ease: EASE },
  hover: { duration: DURATION.hover, ease: EASE },
  press: { duration: DURATION.press, ease: EASE },
  layout: { duration: DURATION.page, ease: EASE },
  instant: { duration: 0 },
} satisfies Record<string, Transition>;

// ---------------------------------------------------------------------------
// framer-motion variants. "hidden" is always instant: an element is only ever
// switched to it while it is off-screen (see useScrollReveal), so there's
// nothing to animate — only the way *in* is visible.
// ---------------------------------------------------------------------------

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.revealRise, transition: transition.instant },
  visible: { opacity: 1, y: 0, transition: transition.reveal },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -DISTANCE.timelineSlide, transition: transition.instant },
  visible: { opacity: 1, x: 0, transition: transition.reveal },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: DISTANCE.timelineSlide, transition: transition.instant },
  visible: { opacity: 1, x: 0, transition: transition.reveal },
};

export const staggerContainer: Variants = {
  hidden: { transition: transition.instant },
  visible: { transition: { staggerChildren: STAGGER.gap, delayChildren: STAGGER.firstDelay } },
};

export const revealVariants = { fadeUp, slideLeft, slideRight } as const;
export type RevealVariant = keyof typeof revealVariants;

/** Filter grid enter/exit — cards fade and settle while layout glides the rest. */
export const filterItem: Variants = {
  hidden: { opacity: 0, scale: SCALE.press },
  visible: { opacity: 1, scale: 1, transition: transition.reveal },
  exit: { opacity: 0, scale: SCALE.press, transition: transition.hover },
};

/** Testimonial carousel crossfade + slide; `custom` is the direction (1 / -1). */
export const carouselSlide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * DISTANCE.carouselSlide }),
  center: { opacity: 1, x: 0, transition: transition.reveal },
  exit: (dir: number) => ({ opacity: 0, x: dir * -DISTANCE.carouselSlide, transition: transition.hover }),
};

/** Mobile nav: panel drops in, links follow one after another. */
export const menuPanel: Variants = {
  hidden: { opacity: 0, y: DISTANCE.menuDrop, transition: transition.hover },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition.hover, staggerChildren: STAGGER.gap, delayChildren: STAGGER.firstDelay },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.menuDrop },
  visible: { opacity: 1, y: 0, transition: transition.reveal },
};

/** Rotating hero role pill. */
export const roleSwap: Variants = {
  enter: { opacity: 0, y: DISTANCE.revealRise / 2 },
  center: { opacity: 1, y: 0, transition: transition.reveal },
  exit: { opacity: 0, y: -DISTANCE.revealRise / 2, transition: transition.hover },
};

/** Copy button icon → check. */
export const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: [0.5, SCALE.pop, 1], transition: { duration: DURATION.hover * 2, ease: EASE } },
  exit: { opacity: 0, scale: 0.5, transition: transition.hover },
};

export const shakeKeyframes = [0, -DISTANCE.shake, DISTANCE.shake, -DISTANCE.shake / 2, DISTANCE.shake / 2, 0];

// ---------------------------------------------------------------------------
// Shared-element morph names. Card and detail header must call the same
// helper so the pair always matches.
// ---------------------------------------------------------------------------

export const morphName = {
  blogCover: (slug: string) => `blog-cover-${slug}`,
  blogTitle: (slug: string) => `blog-title-${slug}`,
  courseTitle: (slug: string) => `course-title-${slug}`,
} as const;

/** view-transition-class shared by every morph pair (styled in globals.css). */
export const MORPH_CLASS = "morph";

// ---------------------------------------------------------------------------
// CSS custom properties — the bridge to CSS-only effects.
// ---------------------------------------------------------------------------

const s = (v: number) => `${v}s`;
const px = (v: number) => `${v}px`;

export const motionCssVars = {
  "--motion-ease": `cubic-bezier(${EASE.join(", ")})`,
  "--motion-loop-ease": LOOP_EASE,
  "--motion-hover": s(DURATION.hover),
  "--motion-press": s(DURATION.press),
  "--motion-reveal": s(DURATION.reveal),
  "--motion-page": s(DURATION.page),
  "--motion-morph": s(DURATION.morph),
  "--motion-media-zoom-duration": s(DURATION.mediaZoom),
  "--motion-curtain": s(DURATION.heroCurtain),
  "--motion-blob-loop": s(DURATION.blobLoop),
  "--motion-rise": px(DISTANCE.revealRise),
  "--motion-slide": px(DISTANCE.timelineSlide),
  "--motion-lift-card": px(DISTANCE.liftCard),
  "--motion-lift-button": px(DISTANCE.liftButton),
  "--motion-arrow-nudge": px(DISTANCE.arrowNudge),
  "--motion-blob-drift": px(DISTANCE.blobDrift),
  "--motion-blob-scale": String(SCALE.blob),
  "--motion-label-float": px(DISTANCE.labelFloat),
  "--motion-label-scale": String(SCALE.labelFloat),
  "--motion-press-scale": String(SCALE.press),
  "--motion-press-card-scale": String(SCALE.pressCard),
  "--motion-media-zoom": String(SCALE.mediaZoom),
  "--motion-stagger": s(STAGGER.gap),
  "--motion-word-stagger": s(STAGGER.word),
} as CSSProperties;

/**
 * Delay (seconds) for a hero/page-intro element that follows a word-revealed
 * headline: it waits for the last word, then steps in `step` stagger gaps later.
 */
export function introDelay(headline: string, step: number): number {
  const words = headline.trim().split(/\s+/).filter(Boolean).length;
  return words * STAGGER.word + step * STAGGER.gap;
}
