export default function ProductsLoading() {
    return (
        <div className="min-h-screen bg-background animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="relative py-20 px-6 bg-gradient-to-br from-green-900 to-green-800">
                <div className="max-w-7xl mx-auto space-y-4">
                    <div className="h-4 w-32 bg-green-700 rounded" />
                    <div className="h-14 w-96 max-w-full bg-green-700 rounded" />
                    <div className="h-14 w-64 bg-green-700 rounded" />
                    <div className="h-5 w-80 max-w-full bg-green-700/60 rounded mt-4" />
                </div>
            </div>

            {/* Filter + Product Grid Skeleton */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-5 w-28 bg-gray-200 rounded" />
                    <div className="h-10 w-64 bg-gray-100 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                    {/* Sidebar Filter */}
                    <div className="hidden md:block space-y-6">
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-4 w-32 bg-gray-100 rounded" />
                            ))}
                        </div>
                    </div>
                    {/* Product Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                                <div className="h-48 bg-gray-200" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-4 w-1/2 bg-gray-100 rounded" />
                                    <div className="h-8 w-24 bg-green-100 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
