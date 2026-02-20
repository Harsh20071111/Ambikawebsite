"use client";

import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AdminGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAdmin();
    const pathname = usePathname();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            router.replace("/admin/login");
        }
        setChecking(false);
    }, [isAuthenticated, isLoginPage, router]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="lg:ml-64 min-h-screen">
                <div className="p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminProvider>
            <AdminGuard>{children}</AdminGuard>
        </AdminProvider>
    );
}
