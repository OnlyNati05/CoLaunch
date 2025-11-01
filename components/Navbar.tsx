"use client";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState("");
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
    { href: "/matches", label: "Discover", color: "pink", id: "matches" },
    { href: "/matches/list", label: "Matches", color: "blue", id: "list" },
    { href: "/chat", label: "Messages", color: "green", id: "chat" },
    { href: "/profile", label: "Profile", color: "purple", id: "profile" },
  ];

  return (
    <nav className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              CoLaunch
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  setActiveTab(item.id);
                }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  firstSegment === item.id
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {firstSegment === item.id && (
                  <span className="absolute inset-0 bg-linear-to-r from-pink-500/10 to-purple-500/10 dark:from-pink-500/20 dark:to-purple-500/20 rounded-lg"></span>
                )}
                <span className="relative">{item.label}</span>
                {item.id === firstSegment && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-linear-to-r from-pink-500 to-purple-600 rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={signOut}
                className="group relative inline-flex items-center px-5 py-2.5 bg-linear-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ) : (
              <a
                href="/auth"
                className="group relative inline-flex items-center px-6 py-2.5 bg-linear-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
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
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
