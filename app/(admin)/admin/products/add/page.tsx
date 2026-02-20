"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Upload, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = ["Trolleys", "Cultivators", "Rotavators", "Ploughs", "Harvesters", "Seed Drills", "Other"];

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        status: "Active",
        imageUrl: "",
    });

    const handleFileUpload = useCallback(async (file: File) => {
        setUploadError(null);

        // Client-side validation
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            setUploadError("Only JPEG, PNG, and WebP files are allowed.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setUploadError("File must be smaller than 10 MB.");
            return;
        }

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Upload failed");
            }

            setForm((prev) => ({ ...prev, imageUrl: data.url }));
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : "Upload failed");
            setPreview(null);
            setForm((prev) => ({ ...prev, imageUrl: "" }));
        } finally {
            setUploading(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files?.[0];
            if (file) handleFileUpload(file);
        },
        [handleFileUpload]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
        },
        [handleFileUpload]
    );

    const removeImage = useCallback(() => {
        setPreview(null);
        setForm((prev) => ({ ...prev, imageUrl: "" }));
        setUploadError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, []);

    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Manual validation for fields that don't support native required
        if (!form.name.trim()) {
            setFormError("Product name is required.");
            return;
        }
        if (!form.category) {
            setFormError("Please select a category.");
            return;
        }
        if (!form.price || isNaN(Number.parseFloat(form.price)) || Number.parseFloat(form.price) <= 0) {
            setFormError("Please enter a valid price.");
            return;
        }

        setLoading(true);
        try {
            const result = await createProduct({
                name: form.name.trim(),
                description: form.description.trim() || undefined,
                price: Number.parseFloat(form.price),
                category: form.category,
                status: form.status,
                imageUrl: form.imageUrl || undefined,
            });

            if (result.success) {
                router.push("/admin/products");
                router.refresh();
            } else {
                setFormError(result.error || "Failed to create product");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setFormError("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Add Product</h1>
                    <p className="text-muted-foreground mt-1">
                        Add a new piece of equipment to the catalog
                    </p>
                </div>
            </div>

            <Card className="border border-border">
                <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formError && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                {formError}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Heavy Duty Hydraulic Trolley"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="h-12 bg-muted/30"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={form.category}
                                    onValueChange={(v) => setForm({ ...form, category: v })}
                                >
                                    <SelectTrigger className="h-12 bg-muted/30">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g., 150000"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    required
                                    className="h-12 bg-muted/30"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the product features, specs, use cases..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={4}
                                className="resize-none bg-muted/30"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Product Image</Label>
                                {preview || form.imageUrl ? (
                                    <div className="relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square">
                                        <Image
                                            src={preview || form.imageUrl}
                                            alt="Product preview"
                                            fill
                                            className="object-cover"
                                        />
                                        {uploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    <span className="text-white text-sm font-medium">Uploading...</span>
                                                </div>
                                            </div>
                                        )}
                                        {!uploading && (
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                                                title="Remove image"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${dragActive
                                            ? "border-primary bg-primary/5 scale-[1.02]"
                                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full transition-colors ${dragActive ? "bg-primary/10" : "bg-muted"
                                            }`}>
                                            {dragActive ? (
                                                <Upload className="w-6 h-6 text-primary" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-foreground">
                                                {dragActive ? "Drop image here" : "Click or drag image"}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                JPG, PNG, WebP · Max 10 MB
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                {uploadError && (
                                    <p className="text-sm text-red-500 mt-1">{uploadError}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={form.status}
                                    onValueChange={(v) => setForm({ ...form, status: v })}
                                >
                                    <SelectTrigger className="h-12 bg-muted/30">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                        <SelectItem value="Discontinued">Discontinued</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={loading || uploading}
                                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 gap-2"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Product
                                    </>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/products")}
                                className="h-12 px-6"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
