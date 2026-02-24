export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            <div className="flex">
                {/* Sidebar Skeleton */}
                <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 space-y-6">
                    <div className="h-8 w-32 bg-gray-200 rounded" />
                    <div className="space-y-3 pt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 w-full bg-gray-100 rounded-lg" />
                        ))}
                    </div>
                </div>
                {/* Main Content Skeleton */}
                <div className="flex-1 p-8 space-y-6">
                    <div className="h-8 w-48 bg-gray-200 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-28 bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                                <div className="h-4 w-20 bg-gray-100 rounded" />
                                <div className="h-7 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                    <div className="h-64 bg-white rounded-xl border border-gray-100" />
                </div>
            </div>
        </div>
    );
}
