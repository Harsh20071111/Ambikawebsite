"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return (
        <motion.main
            key={pathname}
            initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.98,
                y: shouldReduceMotion ? 0 : 8,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.main>
    );
}
