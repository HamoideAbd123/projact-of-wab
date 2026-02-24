import { comparePhones } from "@/lib/api";
import { Phone } from "@/types";
import Image from "next/image";
import { AlertCircle, Smartphone } from "lucide-react";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{ ids?: string }>;
}

type ComparablePhoneField = "price" | "brand" | "processor" | "ram" | "storage" | "display" | "camera" | "battery";

export default async function ComparePage({ searchParams }: PageProps) {
    const { ids } = await searchParams;
    const idArray = ids ? ids.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [];

    let phones: Phone[] = [];
    let error: string | null = null;
    if (idArray.length > 0) {
        try {
            phones = await comparePhones(idArray);
        } catch (err) {
            error = err instanceof Error ? err.message : "Failed to load comparison data.";
        }
    }

    const specRows: { label: string; key: ComparablePhoneField; prefix?: string }[] = [
        { label: "Price", key: "price", prefix: "$" },
        { label: "Brand", key: "brand" },
        { label: "Processor", key: "processor" },
        { label: "RAM", key: "ram" },
        { label: "Storage", key: "storage" },
        { label: "Display", key: "display" },
        { label: "Camera", key: "camera" },
        { label: "Battery", key: "battery" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-black text-gray-900 mb-4">Compare Phones</h1>
                <p className="text-gray-500 max-w-xl mx-auto text-lg">
                    Detailed side-by-side comparison of the world&apos;s most powerful mobile devices.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {phones.length > 0 ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-6 text-left bg-gray-50/50 min-w-[200px]">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Specifications</span>
                                    </th>
                                    {phones.map((phone) => (
                                        <th key={phone.id} className="p-6 text-center min-w-[250px] border-l border-gray-50">
                                            <div className="flex flex-col items-center">
                                                <Image
                                                    src={phone.image_url}
                                                    alt={phone.name}
                                                    width={160}
                                                    height={160}
                                                    className="h-32 object-contain mb-4"
                                                />
                                                <h3 className="font-bold text-gray-900">{phone.name}</h3>
                                                <Link
                                                    href={`/phones/${phone.id}`}
                                                    className="text-xs text-blue-600 font-bold hover:underline mt-2"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {specRows.map((row) => (
                                    <tr key={row.label} className="border-b last:border-0 hover:bg-gray-50/30 transition-colors">
                                        <td className="p-6 text-left font-bold text-gray-600 bg-gray-50/50">
                                            {row.label}
                                        </td>
                                        {phones.map((phone) => (
                                            <td key={phone.id} className="p-6 text-center text-gray-900 font-medium border-l border-gray-50">
                                                {row.prefix || ""}{phone[row.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td className="p-6 text-left bg-gray-50/50"></td>
                                    {phones.map((phone) => (
                                        <td key={phone.id} className="p-6 text-center border-l border-gray-50">
                                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-sm">
                                                Buy Now
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Smartphone className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No phones to compare</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        Go back to the home page and add some phones to your comparison list.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                    >
                        Browse Phones
                    </Link>
                </div>
            )}
        </div>
    );
}
