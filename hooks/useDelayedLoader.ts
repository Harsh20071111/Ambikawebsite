"use client";

import { useEffect, useState } from "react";

/**
 * Prevents loader/spinner flickering by delaying visibility.
 * Only shows the loader if loading takes longer than `delay` ms.
 *
 * Usage:
 *   const showLoader = useDelayedLoader(isLoading, 300);
 *   if (showLoader) return <Spinner />;
 *
 * @param isLoading - Whether something is currently loading
 * @param delay - Milliseconds to wait before showing (default 300ms)
 */
export function useDelayedLoader(isLoading: boolean, delay = 300): boolean {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => setShow(true), delay);
            return () => clearTimeout(timer);
        }
        setShow(false);
    }, [isLoading, delay]);

    return show;
}
