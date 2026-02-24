"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Smartphone } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = searchTerm.trim();
        const url = trimmed ? `/?search=${encodeURIComponent(trimmed)}` : "/";
        router.push(url);
    };

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Smartphone className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">Mobiles6G</span>
                        </Link>
                    </div>

                    <form className="flex-1 max-w-sm mx-8 hidden sm:block" onSubmit={onSubmit}>
                        <div className="relative" role="search">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search phones..."
                            />
                        </div>
                    </form>

                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/compare" className="text-gray-600 hover:text-blue-600 font-medium">Compare</Link>
                        <Link href="/samsung" className="text-gray-600 hover:text-blue-600 font-medium">Samsung</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
