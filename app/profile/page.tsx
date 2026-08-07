"use client";

import PageLoader from "@/components/PageLoader";
import { calculateAge } from "@/lib/helpers/calculate-age";
import { getCurrentUserProfile } from "@/lib/actions/profile";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Edit3,
  MapPin,
  RefreshCw,
  Ruler,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: { min: number; max: number };
  distance: number;
  gender_preference: ("male" | "female" | "other")[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      let redirecting = false;
      try {
        const profileData = await getCurrentUserProfile();
        if (profileData) setProfile(profileData);
        else {
          redirecting = true;
          router.replace("/auth");
        }
      } catch (caughtError) {
        if (
          caughtError instanceof Error &&
          caughtError.message === "Not authenticated."
        ) {
          redirecting = true;
          router.replace("/auth");
        } else {
          setError("We couldn’t load your profile.");
        }
      } finally {
        if (!redirecting) setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32"></div>
    );
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#080b16] px-5 pt-20 text-white">
        <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
            <AlertCircle />
          </span>
          <h1 className="mt-5 text-2xl font-semibold">Profile unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error ?? "Unable to load your profile."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      </main>
    );
  }

  const preferences = profile.preferences;

  return (
    <main className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              Founder profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your CoLaunch identity
            </h1>
            <p className="mt-2 text-slate-400">
              Keep your story clear so the right builders can find you.
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold shadow-[0_10px_30px_rgba(124,58,237,0.2)] transition hover:bg-violet-500"
          >
            <Edit3 className="h-4 w-4" /> Edit profile
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-full w-2 bg-violet-600" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <img
                src={profile.avatar_url || "/default-avatar.png"}
                alt={profile.full_name}
                className="h-28 w-28 rounded-3xl border-2 border-slate-700 object-cover sm:h-32 sm:w-32"
              />
              <span
                className={`absolute -bottom-2 -right-2 h-7 w-7 rounded-full border-4 border-slate-900 ${profile.is_online ? "bg-emerald-500" : "bg-slate-500"}`}
                title={profile.is_online ? "Online" : "Offline"}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  {profile.full_name}
                </h2>
                {profile.is_verified && (
                  <BadgeCheck
                    className="h-6 w-6 text-blue-400"
                    aria-label="Verified profile"
                  />
                )}
              </div>
              <p className="mt-1 font-medium text-violet-400">
                @{profile.username}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="rounded-lg bg-slate-800 px-3 py-2">
                  {calculateAge(profile.birthdate)} years old
                </span>
                <span className="rounded-lg bg-slate-800 px-3 py-2 capitalize">
                  {profile.gender}
                </span>
                <span className="rounded-lg bg-slate-800 px-3 py-2">
                  Joined{" "}
                  {new Date(profile.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl bg-violet-500/10 px-5 py-4 sm:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Profile status
              </p>
              <p className="mt-1 flex items-center gap-2 font-semibold sm:justify-end">
                <Sparkles className="h-4 w-4" /> Ready to match
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <UserRound className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold">About me</h2>
              </div>
              <p className="mt-5 whitespace-pre-wrap leading-8 text-slate-300">
                {profile.bio ||
                  "Add a bio to tell potential co-founders what you’re building and what you bring to the table."}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Profile details</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Detail
                  icon={CalendarDays}
                  label="Birthday"
                  value={new Date(profile.birthdate).toLocaleDateString(
                    undefined,
                    { month: "long", day: "numeric", year: "numeric" },
                  )}
                />
                <Detail
                  icon={UserRound}
                  label="Gender"
                  value={profile.gender}
                  capitalize
                />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-400">
                Matching preferences
              </p>
              <div className="mt-5 space-y-3">
                <Detail
                  icon={CalendarDays}
                  label="Preferred age"
                  value={
                    preferences
                      ? `${preferences.age_range.min}–${preferences.age_range.max} years`
                      : "Not set"
                  }
                />
                <Detail
                  icon={Ruler}
                  label="Search distance"
                  value={
                    preferences
                      ? `Within ${preferences.distance} km`
                      : "Not set"
                  }
                />
                <Detail
                  icon={MapPin}
                  label="Profile visibility"
                  value="Active"
                />
              </div>
            </section>
            <Link
              href="/matches"
              className="group flex items-center justify-between rounded-2xl bg-blue-600 p-6 transition hover:bg-blue-500"
            >
              <div>
                <p className="text-sm text-blue-100">Ready to connect?</p>
                <p className="mt-1 font-semibold">Discover founders</p>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  capitalize = false,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#0c101d] p-4">
      <Icon className="h-5 w-5 shrink-0 text-slate-500" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p
          className={`mt-1 truncate text-sm font-medium text-slate-200 ${capitalize ? "capitalize" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
