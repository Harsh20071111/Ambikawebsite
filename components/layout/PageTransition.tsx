"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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
