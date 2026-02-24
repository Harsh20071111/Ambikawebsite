"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface ImageSkeletonProps extends Omit<ImageProps, "onLoad"> {
    skeletonClassName?: string;
}

/**
 * A Next.js Image wrapper that shows a shimmer skeleton while loading,
 * then fades in the image smoothly.
 */
export function ImageSkeleton({
    className = "",
    skeletonClassName = "",
    alt,
    ...props
}: ImageSkeletonProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="image-skeleton-wrapper">
            {/* Shimmer skeleton */}
            {!loaded && (
                <div
                    className={`image-skeleton ${skeletonClassName}`}
                    aria-hidden="true"
                />
            )}

            <Image
                {...props}
                alt={alt}
                className={`${className} image-skeleton__img ${loaded ? "image-skeleton__img--loaded" : ""}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
