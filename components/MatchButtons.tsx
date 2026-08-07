import { Heart, X } from "lucide-react";

export default function MatchButtons({ onLike, onPass }: { onLike: () => void; onPass: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button onClick={onPass} className="group flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 font-semibold text-slate-300 transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-300" aria-label="Pass on this founder">
        <X className="h-5 w-5 transition-transform group-hover:rotate-6" /> Pass
      </button>
      <button onClick={onLike} className="group flex min-h-14 items-center justify-center gap-2 rounded-xl bg-violet-600 font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.2)] transition hover:bg-violet-500" aria-label="Connect with this founder">
        <Heart className="h-5 w-5 transition-transform group-hover:scale-110" fill="currentColor" /> Connect
      </button>
    </div>
  );
}
