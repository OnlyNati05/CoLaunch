"use client";

import { UserProfile } from "@/app/profile/page";
import ChatHeader from "@/components/ChatHeader";
import PageLoader from "@/components/PageLoader";
import StreamChatInterface from "@/components/StreamChatInterface";
import { useAuth } from "@/contexts/auth-context";
import { getUserMatches } from "@/lib/actions/matches";
import { ArrowLeft, MessageCircleOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatConversationPage() {
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = useParams().userId as string;
  const { user, loading: authLoading } = useAuth();
  const chatRef = useRef<{ handleVideoCall: () => void } | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/auth"); return; }
    let active = true;
    async function loadUser() {
      try {
        const matchedUser = (await getUserMatches()).find((match) => match.id === userId);
        if (!active) return;
        if (matchedUser) { setOtherUser(matchedUser); setLoading(false); }
        else router.replace("/chat");
      } catch (error) { console.error(error); router.replace("/chat"); }
    }
    loadUser();
    return () => { active = false; };
  }, [authLoading, router, user, userId]);

  if (loading || authLoading) return <PageLoader message="Opening conversation" description="Connecting to your secure founder chat." />;

  if (!otherUser) return (
    <main className="flex min-h-dvh items-center justify-center bg-[#080b16] px-5 pt-20 text-white"><div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-9 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400"><MessageCircleOff className="h-8 w-8" /></span><h1 className="mt-6 text-2xl font-semibold">Conversation unavailable</h1><p className="mt-3 leading-7 text-slate-400">This founder isn’t in your matches or the conversation no longer exists.</p><button onClick={() => router.replace("/chat")} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-violet-600 px-5 font-semibold hover:bg-violet-500"><ArrowLeft className="h-4 w-4" /> Back to messages</button></div></main>
  );

  return (
    <main className="h-dvh overflow-hidden bg-[#080b16] px-0 pt-20 text-white sm:px-5 sm:pb-5 sm:pt-24">
      <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden border-slate-800 bg-slate-900 sm:rounded-3xl sm:border sm:shadow-2xl sm:shadow-black/30">
        <ChatHeader user={otherUser} onVideoCall={() => chatRef.current?.handleVideoCall()} />
        <div className="min-h-0 flex-1"><StreamChatInterface otherUser={otherUser} ref={chatRef} /></div>
      </div>
    </main>
  );
}
