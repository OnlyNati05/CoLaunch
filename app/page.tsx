"use client";
import { useAuth } from "@/contexts/auth-context";
import {
  Sparkles,
  Users,
  Video,
  MessageCircle,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-500"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 relative overflow-visible pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center">
        <div className="relative container mx-auto px-6 py-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-medium text-purple-300">
                The future of co-founder matching
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
              Find Your Perfect
              <span className="block mt-2 bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Co-Founder Match
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              Connect with like-minded entrepreneurs through{" "}
              <span className="text-pink-400 font-medium">live streaming</span>,
              conversations, and{" "}
              <span className="text-purple-400 font-medium">connections</span>.
            </p>

            {/* Buttons */}
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href="/matches"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 bg-size-[200%_100%] text-white text-base font-bold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] hover:scale-105 hover:bg-position-[100%_0]"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  <span>Start Discovering</span>
                </a>

                <a
                  href="/profile"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-purple-400/50 text-purple-300 text-base font-bold rounded-2xl hover:bg-white/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Profile
                </a>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href="/auth"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 bg-size-[200%_100%] text-white text-base font-bold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] hover:scale-105 hover:bg-position-[100%_0]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Get Started Free</span>
                </a>

                <a
                  href="/matches/list"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-blue-400/50 text-blue-300 text-base font-bold rounded-2xl hover:bg-white/10 hover:border-blue-400 transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Explore Matches
                </a>
              </div>
            )}

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto pb-10">
              <div className="group relative bg-linear-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 transition-all hover:scale-105">
                <div className="w-14 h-14 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Live Streaming
                </h3>
                <p className="text-gray-400">
                  Connect face-to-face with potential co-founders in real-time.
                </p>
              </div>

              <div className="group relative bg-linear-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 transition-all hover:scale-105">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Smart Matching
                </h3>
                <p className="text-gray-400">
                  Custom algorithm finds entrepreneurs who complement you.
                </p>
              </div>

              <div className="group relative bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 transition-all hover:scale-105">
                <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Build Together
                </h3>
                <p className="text-gray-400">
                  Form partnerships with verified founders ready to build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(40px, -60px) scale(1.1);
          }
          50% {
            transform: translate(-40px, 40px) scale(0.9);
          }
          75% {
            transform: translate(60px, 60px) scale(1.05);
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
