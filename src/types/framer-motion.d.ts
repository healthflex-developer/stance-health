/**
 * Framer Motion v12 type patch.
 *
 * v12 changed the internal generic signature of motion components, causing
 * TypeScript to lose HTML attribute types (className, style, onClick, etc.)
 * on motion.div / motion.h1 / motion.p etc.
 *
 * This module augmentation re-adds those attributes globally so every file
 * in the project can use <motion.div className="..." /> without type errors,
 * without touching individual call sites.
 */
import "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

declare module "framer-motion" {
  // Re-export HTMLMotionProps so it can be imported from "framer-motion" directly
  export type { HTMLMotionProps };

  interface MotionProps {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    tabIndex?: number;
    role?: string;
    "aria-label"?: string;
    "aria-hidden"?: boolean | "true" | "false";
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    children?: React.ReactNode;
  }
}
