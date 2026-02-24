"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

const variants = {
    hidden: {
        opacity: 0,
        y: 12,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.main
                key={pathname}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
            >
                {children}
            </motion.main>
        </AnimatePresence>
    );
}
