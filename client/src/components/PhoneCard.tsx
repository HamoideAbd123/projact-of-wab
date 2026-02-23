"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "@/types";
import { Cpu, Maximize, Database, ArrowRight } from "lucide-react";

interface PhoneCardProps {
    phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-6">
                <img
                    src={phone.image_url}
                    alt={phone.name}
                    className="h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-600 border border-gray-100">
                        {phone.brand}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{phone.name}</h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                        <Cpu className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                        <span className="truncate">{phone.processor}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <Database className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                        <span>{phone.ram} | {phone.storage}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <span className="text-xl font-black text-gray-900">${phone.price}</span>
                    <Link
                        href={`/phones/${phone.id}`}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                    >
                        Details
                        <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
