import { Zap } from "lucide-react";

type PageLoaderProps = {
  message?: string;
  description?: string;
  className?: string;
};

export default function PageLoader({
  message = "Getting things ready",
  description = "This will only take a moment.",
  className = "",
}: PageLoaderProps) {
  return (
    <main
      className={`relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#080b16] px-6 pb-10 pt-28 text-white ${className}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="relative flex max-w-sm flex-col items-center text-center"
        role="status"
      >
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-[1.75rem] border border-violet-500/25 [animation-duration:2s]" />
          <span className="absolute inset-2 rounded-3xl border border-slate-700 bg-slate-900" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-[0_12px_35px_rgba(124,58,237,0.3)]">
            <Zap className="h-7 w-7 text-white" fill="currentColor" />
          </span>
        </div>
      </div>
    </main>
  );
}
