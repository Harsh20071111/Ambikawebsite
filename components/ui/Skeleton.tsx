"use client";

import { cn } from "@/lib/utils";

/* ─── Custom shimmer gradient animation ─── */
const shimmerClass =
    "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_1.5s_ease-in-out_infinite] before:-translate-x-full";

/* ─── Base Skeleton ─── */
export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-md bg-gray-200/80",
                shimmerClass,
                className
            )}
            {...props}
        />
    );
}

/* ─── SkeletonText: Configurable text lines ─── */
export function SkeletonText({
    lines = 3,
    className,
    lastLineWidth = "60%",
}: {
    lines?: number;
    className?: string;
    lastLineWidth?: string;
}) {
    return (
        <div className={cn("space-y-2.5", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="h-4"
                    style={{
                        width: i === lines - 1 ? lastLineWidth : "100%",
                    }}
                />
            ))}
        </div>
    );
}

/* ─── SkeletonCard: Image + text placeholder ─── */
export function SkeletonCard({
    imageHeight = "h-48",
    lines = 2,
    className,
}: {
    imageHeight?: string;
    lines?: number;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-xl overflow-hidden border border-gray-100 bg-white",
                className
            )}
        >
            <Skeleton className={cn("w-full rounded-none", imageHeight)} />
            <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                {lines > 1 && <Skeleton className="h-4 w-1/2" />}
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>
        </div>
    );
}

/* ─── SkeletonImage: Aspect-ratio-aware image placeholder ─── */
export function SkeletonImage({
    aspectRatio = "aspect-video",
    className,
}: {
    aspectRatio?: string;
    className?: string;
}) {
    return (
        <Skeleton
            className={cn("w-full rounded-xl", aspectRatio, className)}
        />
    );
}

/* ─── SkeletonCircle: Avatar/icon placeholder ─── */
export function SkeletonCircle({
    size = "w-10 h-10",
    className,
}: {
    size?: string;
    className?: string;
}) {
    return <Skeleton className={cn("rounded-full", size, className)} />;
}
