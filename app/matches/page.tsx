"use client";

import { UserProfile } from "@/app/profile/page";
import MatchButtons from "@/components/MatchButtons";
import MatchCard from "@/components/MatchCard";
import MatchNotification from "@/components/MatchNotification";
import PageLoader from "@/components/PageLoader";
import { getPotentialMatches, likeUser } from "@/lib/actions/matches";
import { ArrowLeft, RefreshCw, Search, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      let redirecting = false;
      try {
        setMatches(await getPotentialMatches());
      } catch (error) {
        if (error instanceof Error && error.message === "Not authenticated.") {
          redirecting = true;
          router.replace("/auth");
        } else console.error(error);
      } finally {
        if (!redirecting) setLoading(false);
      }
    }
    loadUsers();
  }, [router]);

  async function handleLike() {
    const likedUser = matches[currentIndex];
    if (!likedUser) return;
    try {
      const result = await likeUser(likedUser.id);
      if (result.isMatch && result.matchedUser) {
        setMatchedUser(result.matchedUser);
        setShowNotification(true);
      }
      setCurrentIndex((index) => index + 1);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePass() {
    setCurrentIndex((index) => index + 1);
  }

  if (loading)
    return (
      <div className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32"></div>
    );

  const finished = currentIndex >= matches.length;
  const currentMatch = matches[currentIndex];

  return (
    <main className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={() => router.back()}
              className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
                Founder discovery
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find your counterpart
              </h1>
              <p className="mt-2 text-slate-400">
                Review people selected around your founder preferences.
              </p>
            </div>
          </div>
          <Link
            href="/matches/list"
            className="hidden items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 sm:flex"
          >
            <Users className="h-4 w-4 text-violet-400" /> Your matches
          </Link>
        </header>

        {finished ? (
          <section className="mx-auto mt-16 max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
              <Search className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold">
              You’re all caught up
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              You’ve reviewed every founder available right now. Check back soon
              for new people.
            </p>
            <button
              onClick={() => setCurrentIndex(0)}
              disabled={matches.length === 0}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-violet-600 px-5 font-semibold hover:bg-violet-500 disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" /> Review again
            </button>
          </section>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_27rem_1fr]">
            <aside className="hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:block">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <p className="mt-4 text-sm font-semibold">Curated for you</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Profiles are selected using your age, distance, and founder
                preferences.
              </p>
            </aside>
            <div>
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>
                  Profile {currentIndex + 1} of {matches.length}
                </span>
                <span>
                  {Math.round(((currentIndex + 1) / matches.length) * 100)}%
                  reviewed
                </span>
              </div>
              <div className="mb-5 h-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{
                    width: `${((currentIndex + 1) / matches.length) * 100}%`,
                  }}
                />
              </div>
              <MatchCard user={currentMatch} />
              <div className="mt-4">
                <MatchButtons onLike={handleLike} onPass={handlePass} />
              </div>
            </div>
            <aside className="hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:block">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-400">
                A good first message
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Mention something specific from their bio and share what made
                you want to connect.
              </p>
            </aside>
          </div>
        )}
      </div>
      {showNotification && matchedUser && (
        <MatchNotification
          match={matchedUser}
          onClose={() => setShowNotification(false)}
          onStartChat={() => router.push(`/chat/${matchedUser.id}`)}
        />
      )}
    </main>
  );
}
