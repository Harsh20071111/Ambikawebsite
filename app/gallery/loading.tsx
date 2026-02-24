import { Skeleton } from "@/components/ui/Skeleton";

export default function GalleryLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Skeleton */}
            <div className="relative py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto space-y-4 text-center">
                    <Skeleton className="h-4 w-24 bg-gray-700/60 mx-auto" />
                    <Skeleton className="h-12 w-72 bg-gray-700/60 mx-auto" />
                    <Skeleton className="h-5 w-96 max-w-full bg-gray-700/40 mx-auto" />
                </div>
            </div>

            {/* Gallery Masonry Skeleton */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {[180, 240, 160, 280, 200, 220, 170, 260, 190, 230, 210, 250].map(
                        (h, i) => (
                            <Skeleton
                                key={i}
                                className="w-full rounded-xl break-inside-avoid"
                                style={{ height: h }}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
