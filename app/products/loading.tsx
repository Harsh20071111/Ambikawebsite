import {
    Skeleton,
    SkeletonCard,
} from "@/components/ui/Skeleton";

export default function ProductsLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner Skeleton */}
            <div className="relative py-20 px-6 bg-gradient-to-br from-green-900 to-green-800">
                <div className="max-w-7xl mx-auto space-y-4">
                    <Skeleton className="h-4 w-32 bg-green-700/60" />
                    <Skeleton className="h-14 w-96 max-w-full bg-green-700/60" />
                    <Skeleton className="h-14 w-64 bg-green-700/60" />
                    <Skeleton className="h-5 w-80 max-w-full bg-green-700/40 mt-4" />
                </div>
            </div>

            {/* Filter + Product Grid Skeleton */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-10 w-64 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                    {/* Sidebar Filter */}
                    <div className="hidden md:block space-y-6">
                        <Skeleton className="h-6 w-20" />
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-32" />
                            ))}
                        </div>
                        <Skeleton className="h-px w-full bg-gray-100" />
                        <Skeleton className="h-6 w-16" />
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-28" />
                            ))}
                        </div>
                    </div>
                    {/* Product Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
