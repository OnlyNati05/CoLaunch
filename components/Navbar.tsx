"use client";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Zap,
  Compass,
  Users,
  MessageCircle,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  let firstSegment = "";
  if (segments.length > 1) {
    firstSegment = segments[1];
  } else if (segments.length === 1) {
    firstSegment = segments[0];
  } else {
    firstSegment = "home";
  }

  const navItems = [
    { href: "/matches", label: "Discover", icon: Compass, id: "matches" },
    { href: "/matches/list", label: "Matches", icon: Users, id: "list" },
    { href: "/chat", label: "Messages", icon: MessageCircle, id: "chat" },
    { href: "/profile", label: "Profile", icon: UserCircle, id: "profile" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-500/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-linear-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-linear-to-rrom-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-size-[200%_100%] group-hover:bg-position-[100%_0] transition-all duration-500">
                CoLaunch
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = firstSegment === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative group px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <>
                        <span className="absolute inset-0 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 bg-size-[200%_100%] rounded-xl animate-gradient-shift"></span>
                        <span className="absolute inset-0 bg-white/5 rounded-xl"></span>
                      </>
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-colors duration-300"></span>
                    )}
                    <span className="relative flex items-center space-x-2">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-pink-400"
                            : "text-gray-500 group-hover:text-purple-400"
                        } transition-colors`}
                      />
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-linear-to-r from-pink-400 to-purple-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Auth Button */}
            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  onClick={signOut}
                  className="group relative hidden md:inline-flex items-center px-6 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-300 "
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="relative z-10">Sign Out</span>
                </button>
              ) : (
                <a
                  href="/auth"
                  className="group relative hidden md:inline-flex items-center px-8 py-3 bg-purple-500 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-500 hover:scale-103"
                >
                  <span className="relative z-10 flex items-center">
                    Sign In
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-2 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = firstSegment === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-linear-to-r from-pink-500/20 to-purple-500/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-pink-400" : ""}`}
                  />
                  <span className="font-semibold">{item.label}</span>
                </a>
              );
            })}

            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <a
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-2 bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-pink-500/30"
              >
                <span>Sign In</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </>
  );
}
