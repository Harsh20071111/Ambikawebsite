"use client";

import {
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Package,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAdmin();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-extrabold text-lg">A</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">
                            AMBIKA ENGINEERING
                        </h1>
                        <p className="text-white/50 text-xs font-medium">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                            isActive(item.href)
                                ? "bg-white/20 text-white shadow-lg shadow-black/10"
                                : "text-white/60 hover:text-white hover:bg-white/10",
                        )}
                    >
                        <item.icon
                            className={cn(
                                "w-5 h-5 transition-colors",
                                isActive(item.href)
                                    ? "text-white"
                                    : "text-white/50 group-hover:text-white",
                            )}
                        />
                        <span>{item.name}</span>
                        {isActive(item.href) && (
                            <ChevronRight className="w-4 h-4 ml-auto text-white/60" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-[#064E3B] flex flex-col z-40 transition-transform duration-300",
                    "lg:translate-x-0",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                )}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
