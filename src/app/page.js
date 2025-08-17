"use client";

import Link from 'next/link';

// Helper component for an Icon
const IconArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

// Main Home Page Component
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 font-sans text-center">
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl">
        
        {/* Background Gradient Shapes */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Transform Your Meetings with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
                Stop wasting time on manual note-taking. Upload your transcripts, get instant, intelligent summaries, and share them with your team in seconds.
            </p>
            <div className="mt-12">
                <Link href="/summarizer" legacyBehavior>
                    <a className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                        Try Now for Free
                        <IconArrowRight />
                    </a>
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
