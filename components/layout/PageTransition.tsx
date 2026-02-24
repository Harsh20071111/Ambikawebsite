"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            prevPathname.current = pathname;
            setIsTransitioning(true);
            window.scrollTo({ top: 0, behavior: "instant" });

            const timer = setTimeout(() => setIsTransitioning(false), 600);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return (
        <>
            {/* Route transition overlay */}
            {isTransitioning && (
                <div className="route-overlay" aria-hidden="true">
                    <div className="route-overlay__spinner">
                        <div className="route-overlay__ring" />
                    </div>
                </div>
            )}

            {/* Top progress bar */}
            {isTransitioning && (
                <div className="route-progress" aria-hidden="true">
                    <div className="route-progress__bar" />
                </div>
            )}

            <motion.main
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {children}
            </motion.main>
        </>
    );
}
