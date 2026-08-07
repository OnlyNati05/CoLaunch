"use client";

import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import PageLoader from "@/components/PageLoader";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
        if (data.user && !data.session) {
          setError(
            "Check your inbox to confirm your email, then come back to sign in.",
          );
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setIsSignUp((current) => !current);
    setError("");
  }

  if (authLoading || user) {
    return (
      <div className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32"></div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b16] px-4 pb-8 pt-24 text-white sm:px-6 sm:pb-12 sm:pt-28">
      <div className="mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-violet-600 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-violet-500" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border-[42px] border-blue-500/40" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className=" rounded-lg overflow-hidden ">
                <Image
                  src="/colaunch_logo_white.png"
                  alt=""
                  width={1254}
                  height={1254}
                  className="size-8 object-cover"
                />
              </div>
              <span className="text-xl font-bold">CoLaunch</span>
            </Link>

            <div className="mt-15">
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em] xl:text-5xl">
                Big ideas are better with the right person beside you.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-8 text-violet-100">
                Join a focused community of ambitious people ready to turn ideas
                into companies.
              </p>
            </div>
          </div>

          <div className="relative mt-12 rounded-2xl bg-violet-700 p-5">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((profileNumber) => (
                  <Image
                    key={profileNumber}
                    src={`/profile_images/pfp${profileNumber}.jpg`}
                    alt={`CoLaunch community member ${profileNumber}`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-violet-700 object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">Built for builders</p>
                <p className="mt-0.5 text-xs text-violet-200">
                  Find your missing piece.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="relative flex items-center justify-center bg-[#0c101d] px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white lg:absolute lg:right-8 lg:top-8 lg:mb-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mb-8 lg:hidden">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
                <Zap className="h-6 w-6" fill="currentColor" />
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {isSignUp
                  ? "Start your founder journey"
                  : "Sign in to CoLaunch"}
              </h2>
              <p className="mt-3 leading-7 text-slate-400">
                {isSignUp
                  ? "Create a free account and meet people who are ready to build."
                  : "Pick up where you left off and keep building momentum."}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block min-h-14 w-full rounded-xl border border-slate-700 bg-slate-900 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-200"
                  >
                    Password
                  </label>
                  {!isSignUp && (
                    <span className="text-xs font-medium text-slate-500">
                      At least 6 characters
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    minLength={6}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="block min-h-14 w-full rounded-xl border border-slate-700 bg-slate-900 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <p className="text-sm leading-6 text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-base font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.2)] transition hover:-translate-y-0.5 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0c101d] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {isSignUp ? "Create free account" : "Sign in"}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-1.5 text-sm">
              <span className="text-slate-400">
                {isSignUp ? "Already have an account?" : "New to CoLaunch?"}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                {isSignUp ? "Sign in" : "Create an account"}
              </button>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              Your information stays private and secure.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
