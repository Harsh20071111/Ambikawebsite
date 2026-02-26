"use client";

import { ArrowLeft, ImageIcon, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/lib/actions/products";

const categories = [
    "Trolleys",
    "Cultivators",
    "Rotavators",
    "Ploughs",
    "Harvesters",
    "Seed Drills",
    "Other",
];

const buildTypes = ["Hydraulic", "Mechanical", "Heavy Duty"];
const capacityRanges = ["Under 5 Tons", "5-10 Tons", "10+ Tons"];

// Same interface returned by getProductById
interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number | string;
    category: string;
    status: string;
    imageUrl: string | null;
    images: string[];
    buildType: string | null;
    capacity: string | null;
}

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        status: product.status || "Active",
        imageUrl: product.imageUrl || "",
        images: product.images || [],
        buildType: product.buildType || "",
        capacity: product.capacity || "",
    });

    const handleFileUpload = useCallback(async (files: FileList | File[]) => {
        setUploadError(null);
        setUploading(true);

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const validFiles = Array.from(files).filter(
            (f) => allowedTypes.includes(f.type) && f.size <= 10 * 1024 * 1024,
        );

        if (validFiles.length !== files.length) {
            setUploadError(
                "Some files were skipped. (Only JPEG/PNG/WebP under 10MB are allowed)",
            );
        }

        if (validFiles.length === 0) {
            setUploading(false);
            return;
        }

        // Show local previews immediately
        const localPreviews = validFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...localPreviews]);

        const uploadedUrls: string[] = [];

        try {
            for (const file of validFiles) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();

                if (res.ok && data.url) {
                    uploadedUrls.push(data.url);
                }
            }

            setForm((prev) => {
                const newImages = [...prev.images, ...uploadedUrls];
                return {
                    ...prev,
                    images: newImages,
                    // Fallback the first uploaded image to imageUrl if empty
                    imageUrl: prev.imageUrl || newImages[0] || "",
                };
            });
        } catch (_err) {
            setUploadError("An error occurred during multi-upload upload.");
        } finally {
            setUploading(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files?.length > 0) {
                handleFileUpload(e.dataTransfer.files);
            }
        },
        [handleFileUpload],
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
            if (e.target.files?.length) {
                handleFileUpload(e.target.files);
            }
        },
        [handleFileUpload],
    );

    const removeImage = useCallback((indexToRemove: number) => {
        // We only have previews for newly uploaded images
        // If we're removing an existing image, it won't be in previews
        setForm((prev) => {
            const filteredImages = prev.images.filter((_, i) => i !== indexToRemove);
            return {
                ...prev,
                images: filteredImages,
                // Update main imageUrl if the first element was removed and we have other elements
                imageUrl: filteredImages.length > 0 ? filteredImages[0] : "",
            };
        });
        setUploadError(null);
    }, []);

    // Sync previews with form images count, for any previews if we wanted to map them, but for edit
    // we are displaying form.images. Previews are only temporary object URLs. So we display
    // form.images or previews combined? Actually, the handleFileUpload appends uploaded URLs to form.images.
    // So the UI can just map over form.images since they become actual URLs once uploaded.
    // Wait, `previews` is appended with local URLs, and `form.images` is appended with final URLs.
    // If we map over `form.images`, we don't even need `previews` array except while uploading.
    // The existing add form uses `(previews.length > 0 ? previews : form.images).map(...)` which has bugs when you mix pre-existing and new images.
    // For Edit mode, we just render `form.images`, and any uploading indicators.

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
        if (
            !form.price ||
            Number.isNaN(Number.parseFloat(form.price)) ||
            Number.parseFloat(form.price) <= 0
        ) {
            setFormError("Please enter a valid price.");
            return;
        }

        setLoading(true);
        try {
            const parsedPrice = Number.parseFloat(form.price);
            if (isNaN(parsedPrice)) {
                setFormError("Please enter a valid price.");
                setUploading(false);
                return;
            }

            const result = await updateProduct(product.id, {
                name: form.name.trim(),
                description: form.description.trim() || undefined,
                price: parsedPrice,
                category: form.category,
                status: form.status,
                imageUrl: form.imageUrl || undefined,
                images: form.images,
                buildType: form.buildType || undefined,
                capacity: form.capacity || undefined,
            });

            if (result.success) {
                router.push("/admin/products");
                router.refresh();
            } else {
                setFormError(result.error || "Failed to update product");
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
                    <h1 className="text-3xl font-bold text-foreground">Edit Product</h1>
                    <p className="text-muted-foreground mt-1">
                        Update details for <span className="font-medium text-foreground">{product.name}</span>
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
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                rows={4}
                                className="resize-none bg-muted/30"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="buildType">Build Type</Label>
                                <Select
                                    value={form.buildType}
                                    onValueChange={(v) => setForm({ ...form, buildType: v })}
                                >
                                    <SelectTrigger className="h-12 bg-muted/30">
                                        <SelectValue placeholder="Select build type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {buildTypes.map((bt) => (
                                            <SelectItem key={bt} value={bt}>
                                                {bt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="capacity">Capacity</Label>
                                <Select
                                    value={form.capacity}
                                    onValueChange={(v) => setForm({ ...form, capacity: v })}
                                >
                                    <SelectTrigger className="h-12 bg-muted/30">
                                        <SelectValue placeholder="Select capacity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {capacityRanges.map((cr) => (
                                            <SelectItem key={cr} value={cr}>
                                                {cr}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Image Upload */}
                            <div className="space-y-4 md:col-span-2">
                                <Label>Product Images</Label>

                                {form.images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {form.images.map((src, index) => (
                                            <div
                                                key={src}
                                                className="relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square group"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`Product image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {!uploading && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Remove image"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {uploading && (
                                            <div className="relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square flex items-center justify-center">
                                                <svg
                                                    aria-hidden="true"
                                                    className="animate-spin h-6 w-6 text-primary"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        className="opacity-25"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        className="opacity-75"
                                                    />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Add More Button */}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="relative aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2"
                                        >
                                            <div className="p-2 rounded-full bg-muted transition-colors">
                                                <Upload className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                Add More
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative w-full aspect-[21/9] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${dragActive
                                                ? "border-primary bg-primary/5 scale-[1.01]"
                                                : "border-border hover:border-primary/50 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div
                                            className={`p-4 rounded-full transition-colors ${dragActive ? "bg-primary/10" : "bg-muted"
                                                }`}
                                        >
                                            {dragActive ? (
                                                <Upload className="w-8 h-8 text-primary" />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-medium text-foreground">
                                                {dragActive ? "Drop images here" : "Click or drag images here"}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Select multiple files (JPG, PNG, WebP)
                                            </p>
                                        </div>
                                    </button>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
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
                                        <svg
                                            aria-hidden="true"
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
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
