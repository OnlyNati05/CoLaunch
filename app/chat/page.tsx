"use client";

import { UserProfile } from "@/app/profile/page";
import PageLoader from "@/components/PageLoader";
import { getUserMatches } from "@/lib/actions/matches";
import { ArrowRight, MessageCircle, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ChatData {
  id: string;
  user: UserProfile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function ChatPage() {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadChats() {
      let redirecting = false;
      try {
        const matches = await getUserMatches();
        setChats(
          matches.map((match) => ({
            id: match.id,
            user: match,
            lastMessage: "Start your conversation",
            lastMessageTime: match.created_at,
            unreadCount: 0,
          })),
        );
      } catch (error) {
        if (error instanceof Error && error.message === "Not authenticated.") {
          redirecting = true;
          router.replace("/auth");
        } else console.error(error);
      } finally {
        if (!redirecting) setLoading(false);
      }
    }
    loadChats();
  }, [router]);

  const filteredChats = useMemo(
    () =>
      chats.filter((chat) =>
        `${chat.user.full_name} ${chat.user.username}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [chats, query],
  );

  if (loading)
    return (
      <div className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32"></div>
    );

  return (
    <main className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
            Inbox
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Founder conversations
          </h1>
          <p className="mt-2 text-slate-400">
            Keep the conversation moving from introduction to idea.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-semibold">Messages</p>
              <p className="mt-1 text-xs text-slate-500">
                {chats.length} conversation{chats.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search conversations"
                className="min-h-11 w-full rounded-xl border border-slate-700 bg-[#0c101d] pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-violet-500"
              />
            </div>
          </div>

          {chats.length === 0 ? (
            <div className="p-10 text-center sm:p-16">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <MessageCircle className="h-8 w-8" />
              </span>
              <h2 className="mt-6 text-xl font-semibold">
                No conversations yet
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
                Match with a founder, then come back here to start building
                rapport.
              </p>
              <Link
                href="/matches"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-violet-600 px-5 font-semibold hover:bg-violet-500"
              >
                <Sparkles className="h-4 w-4" /> Discover founders
              </Link>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-400">
              No conversations match “{query}”.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filteredChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  className="group flex items-center gap-4 p-5 transition hover:bg-slate-800/60 sm:p-6"
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.user.avatar_url || "/default-avatar.png"}
                      alt={chat.user.full_name}
                      className="h-14 w-14 rounded-2xl object-cover sm:h-16 sm:w-16"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-slate-900 ${chat.user.is_online ? "bg-emerald-500" : "bg-slate-500"}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="truncate font-semibold sm:text-lg">
                        {chat.user.full_name}
                      </h2>
                      <time className="shrink-0 text-xs text-slate-600">
                        {formatTime(chat.lastMessageTime)}
                      </time>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  const hours = (Date.now() - date.getTime()) / 3_600_000;
  if (hours < 1) return "Just now";
  if (hours < 24)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (hours < 48) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}
