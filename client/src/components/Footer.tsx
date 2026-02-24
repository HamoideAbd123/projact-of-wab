import { Smartphone, Github, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4 text-white">
                            <Smartphone className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold">Mobiles6G</span>
                        </div>
                        <p className="text-sm max-w-xs mb-6">
                            The ultimate platform for discovering and comparing the latest smartphones with modern tech and clean aesthetics.
                        </p>
                        <div className="flex space-x-4">
                            <Twitter className="h-5 w-5 cursor-pointer hover:text-white" />
                            <Facebook className="h-5 w-5 cursor-pointer hover:text-white" />
                            <Github className="h-5 w-5 cursor-pointer hover:text-white" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li><Link href="/compare" className="hover:text-white">Compare</Link></li>
                            <li><Link href="/samsung" className="hover:text-white">Samsung</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:support@mobiles6g.com" className="hover:text-white">Contact</a></li>
                            <li><a href="mailto:support@mobiles6g.com?subject=Mobiles6G%20Support" className="hover:text-white">Support Email</a></li>
                            <li>Privacy Policy (coming soon)</li>
                            <li>Terms of Service (coming soon)</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
                    <p>© {new Date().getFullYear()} Mobiles6G Showcase. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
