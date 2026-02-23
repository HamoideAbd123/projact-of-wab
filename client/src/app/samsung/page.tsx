"use client";

import { useState, useEffect } from "react";
import { getSamsungPhones } from "@/lib/api";
import { Phone } from "@/types";
import PhoneCard from "@/components/PhoneCard";
import { Smartphone, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SamsungPage() {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSamsung = async () => {
            try {
                const data = await getSamsungPhones();
                setPhones(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSamsung();
    }, []);

    return (
        <div className="min-h-screen bg-[#f0f4f8] py-12 px-4 sm:px-6 lg:px-8">
            {/* Transparent Interface Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <Link href="/" className="inline-flex items-center text-blue-600 font-medium hover:underline mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>

                <div className="relative overflow-hidden rounded-3xl p-1 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl">
                    <div className="relative z-10 bg-gradient-to-br from-white/40 to-white/10 p-8 md:p-16 rounded-[calc(1.5rem-1px)]">
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                            Samsung <span className="text-blue-600">Galaxy</span>
                        </h1>
                        <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
                            Explore the pinnacle of mobile innovation. From the ultra-powerful S series to the revolutionary Z series.
                        </p>

                        {/* Design Note: Transparent Interface */}
                        <div className="mt-8 inline-block px-4 py-2 rounded-full bg-blue-100/50 backdrop-blur-sm border border-blue-200 text-blue-800 text-sm font-semibold">
                            ✨ Experience our "Transparent Interface" design
                        </div>
                    </div>

                    {/* Decorative glass elements */}
                    <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Samsung Catalog</h2>
                    {loading && <RefreshCcw className="h-5 w-5 text-blue-600 animate-spin" />}
                </div>

                {!loading && phones.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {phones.map((phone) => (
                            <div key={phone.id} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <PhoneCard phone={phone} />
                            </div>
                        ))}
                    </div>
                ) : !loading && (
                    <div className="text-center py-24 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-inner">
                        <Smartphone className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                        <p className="text-xl text-gray-500 font-medium">No Samsung phones found in the catalog.</p>
                    </div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white/50 backdrop-blur-sm animate-pulse rounded-3xl h-[450px]" />
                        ))}
                    </div>
                )}

                {/* Transparency Explanation Section */}
                <div className="mt-24 p-8 md:p-12 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-xl max-w-4xl mx-auto">
                    <h3 className="text-3xl font-black text-gray-900 mb-6">What are Transparent Interfaces?</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-lg text-justify">
                        <p>
                            In modern UI/UX design, <strong>Transparent Interfaces</strong> refer to two symbiotic concepts:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Visual Transparency:</strong> Using glassmorphism (like the header above!), blurs, and semi-opaque layers to create depth and hierarchy without losing context of the background.
                            </li>
                            <li>
                                <strong>Functional Transparency:</strong> Designing systems so intuitive that the "interface" disappears. The user focuses purely on their task—finding the perfect phone—without being conscious of the buttons and menus they are navigating.
                            </li>
                        </ul>
                        <p>
                            By blending these, we create a "flow state" where the technology serves as a clear window to the content.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
