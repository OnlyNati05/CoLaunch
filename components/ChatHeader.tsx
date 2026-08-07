"use client";

import { UserProfile } from "@/app/profile/page";
import { calculateAge } from "@/lib/helpers/calculate-age";
import { ArrowLeft, BadgeCheck, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatHeader({ user, onVideoCall }: { user: UserProfile; onVideoCall?: () => void }) {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={() => router.back()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:bg-slate-800 hover:text-white" aria-label="Back to messages"><ArrowLeft className="h-5 w-5" /></button>
        <div className="relative shrink-0"><img src={user.avatar_url || "/default-avatar.png"} alt={user.full_name} className="h-11 w-11 rounded-xl object-cover sm:h-12 sm:w-12" /><span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-slate-900 ${user.is_online ? "bg-emerald-500" : "bg-slate-500"}`} /></div>
        <div className="min-w-0"><div className="flex items-center gap-1.5"><h1 className="truncate font-semibold sm:text-lg">{user.full_name}, {calculateAge(user.birthdate)}</h1>{user.is_verified && <BadgeCheck className="h-4 w-4 shrink-0 text-blue-400" />}</div><p className="text-xs text-slate-500">{user.is_online ? "Online now" : `@${user.username}`}</p></div>
      </div>
      <button onClick={onVideoCall} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500" title="Start video call" aria-label="Start video call"><Video className="h-5 w-5" /></button>
    </header>
  );
}
