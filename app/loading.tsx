export default function HomeLoading() {
    return (
        <div className="flex flex-col animate-pulse">
            {/* Hero Slider Skeleton */}
            <div className="min-h-[92vh] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="h-4 w-24 bg-gray-300 rounded" />
                        <div className="space-y-3">
                            <div className="h-10 w-3/4 bg-gray-300 rounded" />
                            <div className="h-10 w-1/2 bg-gray-300 rounded" />
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        <div className="flex gap-3 pt-4">
                            <div className="h-12 w-36 bg-green-200 rounded-full" />
                            <div className="h-12 w-32 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex justify-center">
                        <div className="w-[400px] h-[350px] bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>

            {/* Quick Product Strip Skeleton */}
            <div className="py-6 bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 flex gap-4 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-40 h-14 bg-gray-100 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="py-12 bg-green-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="text-center space-y-2">
                            <div className="h-8 w-20 bg-green-700 rounded mx-auto" />
                            <div className="h-3 w-24 bg-green-700 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
