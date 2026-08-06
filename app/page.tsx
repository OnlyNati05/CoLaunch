"use client";

import { useAuth } from "@/contexts/auth-context";
import PageLoader from "@/components/PageLoader";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Play,
  Rocket,
  Search,
  Users,
  Video,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";

const features = [
  {
    icon: Search,
    title: "Find your fit",
    description:
      "Discover ambitious builders filtered by skills, stage, and working style.",
    accent: "purple",
  },
  {
    icon: Video,
    title: "Meet face-to-face",
    description:
      "Skip the endless messages and test chemistry in a focused live conversation.",
    accent: "purple",
  },
  {
    icon: Rocket,
    title: "Start building",
    description:
      "Turn a promising match into a partnership with shared goals and momentum.",
    accent: "purple",
  },
];

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLoader
        message="Loading CoLaunch"
        description="Preparing your founder network."
      />
    );
  }

  const primaryHref = user ? "/matches" : "/auth";
  const primaryLabel = user ? "Start discovering" : "Find your co-founder";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b16] text-white">
      {/* <DotPattern glow={true} width={32} height={32} /> */}

      <section className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-linear-to-b from-transparent to-[#080b16]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div className="max-w-3xl">
            <h1 className="text-balance mt-14 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              The right idea needs the
              <span className="mt-1 block text-violet-400">
                right co-founder.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Meet driven people with complementary skills, shared ambition, and
              the chemistry to build something remarkable together.
            </p>

            <div className="my-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={primaryHref}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 text-base font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)] transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#080b16]"
              >
                {primaryLabel}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/matches/list"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                <Users className="h-5 w-5 text-blue-400" />
                Browse founders
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            <div className="relative rounded-[2rem] border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/40 sm:p-5">
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-700 bg-[#101525]">
                <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                      Your next match
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      98% compatibility
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online now
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-3xl font-bold text-white">
                      MK
                      <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#101525] bg-violet-600">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold">Maya Kim</h2>
                        <span className="rounded-md bg-violet-500/15 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-300">
                          Top match
                        </span>
                      </div>
                      <p className="mt-1 text-slate-400">
                        Product designer · New York
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
                          B2B SaaS
                        </span>
                        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
                          Full-time
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-slate-700" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-800 p-4">
                      <BriefcaseBusiness className="h-5 w-5 text-violet-400" />
                      <p className="mt-3 text-xs text-slate-500">Brings</p>
                      <p className="mt-1 text-sm font-semibold">
                        Product + Brand
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-800 p-4">
                      <Code2 className="h-5 w-5 text-blue-400" />
                      <p className="mt-3 text-xs text-slate-500">Looking for</p>
                      <p className="mt-1 text-sm font-semibold">
                        Technical founder
                      </p>
                    </div>
                  </div>

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold transition">
                    <Play className="h-4 w-4" fill="currentColor" />
                    Start a quick intro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div>
            <h2 className="my-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
              From searching to building, faster.
            </h2>
            <p className="max-w-md text-base leading-7 text-slate-400">
              CoLaunch turns co-founder discovery into a simple, human process
              built around compatibility.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isBlue = feature.accent === "blue";
              return (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-slate-600 sm:p-8"
                >
                  <span className="absolute right-6 top-5 text-5xl font-bold text-slate-800">
                    0{index + 1}
                  </span>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${isBlue ? "bg-blue-600" : "bg-violet-600"}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {feature.description}
                  </p>
                  <a
                    href={primaryHref}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${isBlue ? "text-blue-400" : "text-violet-400"}`}
                  >
                    Learn more{" "}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl bg-violet-600 px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Your company starts here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Meet the person who makes the idea possible.
              </h2>
            </div>
            <a
              href={primaryHref}
              className="mt-7 inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-violet-700 transition hover:bg-violet-50 lg:mt-0"
            >
              {primaryLabel} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
