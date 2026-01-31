"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ChevronLeft, Home, LifeBuoy } from 'lucide-react';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Professional Icon Shield */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <ShieldAlert size={48} className="text-slate-900" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading Section */}
        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
          Error 403
        </span>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl tracking-tight">
          Unauthorized Access
        </h1>
        <p className="mt-6 text-lg leading-7 text-slate-600">
          We apologize, but you do not have the necessary permissions to access this page. 
          Please ensure you are logged in with the correct credentials or contact your administrator.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-6">
          <p className="text-sm text-slate-500">
            Having trouble?
          </p>
          <Link 
            href="/support" 
            className="flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors"
          >
            <LifeBuoy size={16} />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}