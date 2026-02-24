import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-3">404</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
