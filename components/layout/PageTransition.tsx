"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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
    const [showProgress, setShowProgress] = useState(false);
    const prevPathname = useRef(pathname);

    // Show progress bar + scroll to top on route change
    useEffect(() => {
        if (prevPathname.current !== pathname) {
            prevPathname.current = pathname;
            setShowProgress(true);
            window.scrollTo({ top: 0, behavior: "instant" });

            // Hide progress bar after animation completes
            const timer = setTimeout(() => setShowProgress(false), 900);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <>
            {/* Route change progress bar */}
            {showProgress && (
                <div className="route-progress" aria-hidden="true">
                    <div className="route-progress__bar" />
                </div>
            )}

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
        </>
    );
}
