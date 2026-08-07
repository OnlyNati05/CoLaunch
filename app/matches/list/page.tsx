"use client";

import { UserProfile } from "@/app/profile/page";
import PageLoader from "@/components/PageLoader";
import { getUserMatches } from "@/lib/actions/matches";
import { calculateAge } from "@/lib/helpers/calculate-age";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MatchesListPage() {
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadMatches() {
      let redirecting = false;
      try {
        setMatches(await getUserMatches());
      } catch (error) {
        if (error instanceof Error && error.message === "Not authenticated.") {
          redirecting = true;
          router.replace("/auth");
        } else console.error("Failed to load matches.", error);
      } finally {
        if (!redirecting) setLoading(false);
      }
    }
    loadMatches();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32"></div>
    );

  return (
    <main className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              Connections
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your founder matches
            </h1>
            <p className="mt-2 text-slate-400">
              People where the interest—and potential—is mutual.
            </p>
          </div>
          <Link
            href="/matches"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold hover:bg-violet-500"
          >
            <Sparkles className="h-4 w-4" /> Discover more
          </Link>
        </header>

        <div className="mt-8 flex items-center gap-3 border-b border-slate-800 pb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">
              {matches.length} mutual match{matches.length === 1 ? "" : "es"}
            </p>
            <p className="text-xs text-slate-500">
              Start a conversation while the momentum is fresh.
            </p>
          </div>
        </div>

        {matches.length === 0 ? (
          <section className="mx-auto mt-16 max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <Users className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold">
              Your first match is ahead
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Explore founder profiles and connect with people whose skills
              complement yours.
            </p>
            <Link
              href="/matches"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-violet-600 px-5 font-semibold hover:bg-violet-500"
            >
              Start discovering <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/chat/${match.id}`}
                className="group flex gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-violet-500/50"
              >
                <div className="relative shrink-0">
                  <img
                    src={match.avatar_url || "/default-avatar.png"}
                    alt={match.full_name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-slate-900 ${match.is_online ? "bg-emerald-500" : "bg-slate-500"}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-lg font-semibold">
                      {match.full_name}, {calculateAge(match.birthdate)}
                    </h2>
                    {match.is_verified && (
                      <BadgeCheck className="h-4 w-4 shrink-0 text-blue-400" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-violet-400">
                    @{match.username}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
                    {match.bio || "Say hello and learn what they’re building."}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-xl bg-slate-800 text-slate-400 transition group-hover:bg-violet-600 group-hover:text-white">
                  <MessageCircle className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
