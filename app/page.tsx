"use client";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block mt-2 bg-linear-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Co-Founder
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Connect with like-minded entrepreneurs through live streaming,
              meaningful conversations, and authentic connections.
            </p>

            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/matches"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Start Discovering
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>

                <a
                  href="/profile"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 border-2 border-pink-500 text-pink-500 dark:text-pink-400 text-lg font-semibold rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  View Profile
                </a>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/auth"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>

                <a
                  href="/matches/list"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 border-2 border-purple-500 text-purple-500 dark:text-purple-400 text-lg font-semibold rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore Matches
                </a>
              </div>
            )}

            {/* Trust indicators */}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
