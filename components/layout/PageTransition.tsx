"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return (
        <motion.main
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {children}
        </motion.main>
    );
}
