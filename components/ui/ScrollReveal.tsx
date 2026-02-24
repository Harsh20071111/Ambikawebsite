"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    /** Direction the content slides in from. "auto" alternates based on index. */
    direction?: "left" | "right" | "up" | "auto";
    /** Index used for "auto" direction — odd=right, even=left */
    index?: number;
    /** Animation delay in seconds */
    delay?: number;
    /** Animation duration in seconds */
    duration?: number;
    /** Slide distance in pixels */
    distance?: number;
    /** Additional class names */
    className?: string;
}

export function ScrollReveal({
    children,
    direction = "auto",
    index = 0,
    delay = 0,
    duration = 0.5,
    distance = 30,
    className,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const shouldReduceMotion = useReducedMotion();

    // Resolve "auto" direction based on index
    const resolvedDirection =
        direction === "auto" ? (index % 2 === 0 ? "left" : "right") : direction;

    // Calculate initial offset
    const offsetX =
        resolvedDirection === "left"
            ? -distance
            : resolvedDirection === "right"
                ? distance
                : 0;
    const offsetY = resolvedDirection === "up" ? distance : 0;

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : offsetX,
                y: shouldReduceMotion ? 0 : offsetY,
            }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : {
                        opacity: 0,
                        x: shouldReduceMotion ? 0 : offsetX,
                        y: shouldReduceMotion ? 0 : offsetY,
                    }
            }
            transition={{
                duration: shouldReduceMotion ? 0 : duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
