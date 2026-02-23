import { getPhone } from "@/lib/api";
import { Phone } from "@/types";
import {
    ChevronLeft,
    Cpu,
    Smartphone,
    Camera,
    Battery,
    Database,
    Layout,
    CreditCard
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PhoneDetails({ params }: PageProps) {
    const { id } = await params;
    let phone: Phone | null = null;

    try {
        phone = await getPhone(parseInt(id));
    } catch (error) {
        console.error(error);
    }

    if (!phone) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Phone not found</h1>
                <Link href="/" className="text-blue-600 mt-4 block">Back to Home</Link>
            </div>
        );
    }

    const specs = [
        { label: "Processor", value: phone.processor, icon: Cpu },
        { label: "RAM", value: phone.ram, icon: Database },
        { label: "Storage", value: phone.storage, icon: Database },
        { label: "Camera", value: phone.camera, icon: Camera },
        { label: "Battery", value: phone.battery, icon: Battery },
        { label: "Display", value: phone.display, icon: Layout },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link href="/" className="flex items-center text-gray-500 hover:text-blue-600 mb-8 font-medium transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Results
            </Link>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2 p-4 md:p-8">
                        <ImageGallery images={phone.images} mainImage={phone.image_url} />
                    </div>

                    {/* Info Section */}
                    <div className="md:w-1/2 p-8 md:p-12">
                        <div className="mb-8">
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">{phone.brand}</span>
                            <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4">{phone.name}</h1>
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-black text-blue-600">${phone.price}</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">In Stock</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                            {phone.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            {specs.map((spec) => (
                                <div key={spec.label} className="flex items-start space-x-3">
                                    <div className="bg-blue-50 p-2 rounded-lg">
                                        <spec.icon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">{spec.label}</dt>
                                        <dd className="text-gray-900 font-semibold">{spec.value}</dd>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                            <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center space-x-2">
                                <CreditCard className="h-5 w-5" />
                                <span>Buy Now</span>
                            </button>
                            <Link
                                href={`/compare?ids=${phone.id}`}
                                className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Add to Compare</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
