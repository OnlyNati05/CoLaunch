import { UserProfile } from "@/app/profile/page";
import { calculateAge } from "@/lib/helpers/calculate-age";
import { BadgeCheck, MapPin } from "lucide-react";
import Image from "next/image";

export default function MatchCard({ user }: { user: UserProfile }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/30">
      <div className="relative aspect-[4/4.35] w-full overflow-hidden bg-slate-800">
        <Image src={user.avatar_url || "/default-avatar.png"} alt={user.full_name} fill className="object-cover" priority />
        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
          <span className={`h-2 w-2 rounded-full ${user.is_online ? "bg-emerald-400" : "bg-slate-500"}`} />
          {user.is_online ? "Online now" : "Recently active"}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">{user.full_name}, {calculateAge(user.birthdate)}</h2>
              {user.is_verified && <BadgeCheck className="h-5 w-5 shrink-0 text-blue-400" />}
            </div>
            <p className="mt-1 text-sm font-medium text-violet-400">@{user.username}</p>
          </div>
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">{user.bio || "This founder hasn’t added a bio yet."}</p>
      </div>
    </article>
  );
}
