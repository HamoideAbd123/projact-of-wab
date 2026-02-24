"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-black text-gray-900 mb-3">Something went wrong</h1>
      <p className="text-gray-600 mb-8">Please try reloading this page.</p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
