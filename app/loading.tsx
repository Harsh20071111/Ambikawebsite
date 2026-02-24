import {
    Skeleton,
    SkeletonCard,
} from "@/components/ui/Skeleton";

export default function HomeLoading() {
    return (
        <div className="flex flex-col">
            {/* Hero Slider Skeleton */}
            <div className="min-h-[92vh] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <Skeleton className="h-4 w-24" />
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-10 w-1/2" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-3 pt-4">
                            <Skeleton className="h-12 w-36 rounded-full bg-green-200/80" />
                            <Skeleton className="h-12 w-32 rounded-full" />
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex justify-center">
                        <Skeleton className="w-[400px] h-[350px] rounded-2xl" />
                    </div>
                </div>
            </div>

            {/* Quick Product Strip Skeleton */}
            <div className="py-6 bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 flex gap-4 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="flex-shrink-0 w-40 h-14 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="py-12 bg-green-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="text-center space-y-2">
                            <Skeleton className="h-8 w-20 bg-green-700/60 mx-auto" />
                            <Skeleton className="h-3 w-24 bg-green-700/40 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us Skeleton */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <Skeleton className="h-8 w-48 mx-auto mb-10" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <SkeletonCard key={i} imageHeight="h-32" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
