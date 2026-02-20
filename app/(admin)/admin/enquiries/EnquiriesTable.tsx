"use client";

import { updateEnquiryStatus } from "@/lib/actions/enquiries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Mail, MessageSquare } from "lucide-react";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
}

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleStatusChange = async (id: string, status: string) => {
        await updateEnquiryStatus(id, status);
        router.refresh();
    };

    return (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
            {enquiries.length === 0 ? (
                <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">No enquiries yet</p>
                    <p className="text-sm text-muted-foreground">
                        When customers submit the contact form, their enquiries will appear here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-border">
                    {enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="hover:bg-muted/20 transition-colors">
                            <div
                                className="flex items-center justify-between p-5 cursor-pointer"
                                onClick={() =>
                                    setExpandedId(expandedId === enquiry.id ? null : enquiry.id)
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-bold text-sm">
                                            {enquiry.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{enquiry.name}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>{enquiry.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={enquiry.status}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleStatusChange(enquiry.id, e.target.value);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-primary/30 ${enquiry.status === "New"
                                                ? "bg-green-100 text-green-700"
                                                : enquiry.status === "Read"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        <option value="New">New</option>
                                        <option value="Read">Read</option>
                                        <option value="Contacted">Contacted</option>
                                    </select>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            {expandedId === enquiry.id && (
                                <div className="px-5 pb-5">
                                    <div className="bg-muted/30 rounded-lg p-4 ml-14">
                                        <p className="text-sm font-medium text-foreground mb-1">Message:</p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                            {enquiry.message}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
