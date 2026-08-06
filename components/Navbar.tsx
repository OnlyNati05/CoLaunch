"use client";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080b16]/95 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="relative w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                  <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white transition-colors group-hover:text-violet-300">
                CoLaunch
              </span>
            </Link>

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
                        <span className="absolute inset-0 bg-violet-500/15 rounded-xl"></span>
                      </>
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-colors duration-300"></span>
                    )}
                    <span className="relative flex items-center space-x-2">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-violet-400"
                            : "text-gray-500 group-hover:text-blue-400"
                        } transition-colors`}
                      />
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-400"></span>
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
                  className="group relative hidden md:inline-flex items-center px-8 py-3 bg-violet-600 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-300 hover:bg-violet-500"
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
          <div className="px-6 py-4 space-y-2 border-t border-slate-800 bg-[#080b16]">
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
                      ? "bg-violet-500/15 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-violet-400" : ""}`}
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
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-2 bg-violet-600 text-white rounded-xl font-bold"
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
    </>
  );
}
