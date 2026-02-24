"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
    images: { id: number; image_url: string }[];
    mainImage: string;
}

export default function ImageGallery({ images, mainImage }: ImageGalleryProps) {
    const allImages = images.length > 0 ? images : [{ id: 0, image_url: mainImage }];
    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative aspect-square rounded-2xl bg-white border border-gray-100 overflow-hidden group">
                <Image
                    src={allImages[activeIndex].image_url}
                    alt="Phone view"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                />

                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-800" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-800" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((img, index) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeIndex === index ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-100 opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={img.image_url}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                sizes="80px"
                                className="object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
