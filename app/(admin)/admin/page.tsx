import { Calendar, MessageSquare, Package, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getEnquiries } from "@/lib/actions/enquiries";
import { getProducts } from "@/lib/actions/products";

export default async function AdminDashboard() {
  const products = await getProducts();
  const enquiries = await getEnquiries();

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-500/10 text-blue-600",
      href: "/admin/products",
    },
    {
      label: "Total Enquiries",
      value: enquiries.length,
      icon: MessageSquare,
      color: "bg-green-500/10 text-green-600",
      href: "/admin/enquiries",
    },
    {
      label: "New Enquiries",
      value: enquiries.filter((e) => e.status === "New").length,
      icon: TrendingUp,
      color: "bg-amber-500/10 text-amber-600",
      href: "/admin/enquiries",
    },
    {
      label: "Active Products",
      value: products.filter((p) => p.status === "Active").length,
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600",
      href: "/admin/products",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your AMBIKA ENGINEERING
          platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Recent Enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-sm text-primary font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {enquiries.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No enquiries yet. They will appear here when customers submit the
              contact form.
            </div>
          ) : (
            enquiries.slice(0, 5).map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {enquiry.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {enquiry.email}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      enquiry.status === "New"
                        ? "bg-green-100 text-green-700"
                        : enquiry.status === "Read"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {enquiry.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
