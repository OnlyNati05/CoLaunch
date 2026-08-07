"use client";

import PageLoader from "@/components/PageLoader";
import PhotoUpload from "@/components/PhotoUpload";
import { getCurrentUserProfile, updateUserProfile } from "@/lib/actions/profile";
import { AlertCircle, ArrowLeft, CalendarDays, Check, Save, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputClass = "min-h-13 w-full rounded-xl border border-slate-700 bg-[#0c101d] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({ full_name: "", username: "", bio: "", gender: "male" as "male" | "female" | "other", birthdate: "", avatar_url: "" });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getCurrentUserProfile();
        if (!profile) {
          router.replace("/auth");
          return;
        }
        setFormData({ full_name: profile.full_name || "", username: profile.username || "", bio: profile.bio || "", gender: profile.gender || "male", birthdate: profile.birthdate || "", avatar_url: profile.avatar_url || "" });
        setLoading(false);
      } catch {
        setError("We couldn’t load your profile.");
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const result = await updateUserProfile(formData);
      if (result.success) router.replace("/profile");
      else setError(result.error || "Failed to update profile.");
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  if (loading) return <PageLoader message="Opening profile editor" description="Getting your details ready." />;

  return (
    <main className="min-h-dvh bg-[#080b16] px-5 pb-16 pt-28 text-white sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-4xl">
        <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to profile</button>
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">Profile settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Edit your founder profile</h1>
          <p className="mt-2 text-slate-400">Show potential co-founders who you are and what matters to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative w-fit">
                <img src={formData.avatar_url || "/default-avatar.png"} alt="Profile preview" className="h-28 w-28 rounded-3xl border-2 border-slate-700 object-cover" />
                <PhotoUpload onPhotoUploaded={(url) => setFormData((current) => ({ ...current, avatar_url: url }))} />
              </div>
              <div><h2 className="text-lg font-semibold">Profile photo</h2><p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Choose a clear, friendly photo. JPG, PNG, or GIF up to 5MB.</p><p className="mt-2 text-xs font-medium text-blue-400">Click the camera button to replace it</p></div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400"><UserRound className="h-5 w-5" /></span><div><h2 className="font-semibold">Basic information</h2><p className="text-sm text-slate-500">The essentials people see first.</p></div></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="full_name"><input className={inputClass} id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="Your full name" /></Field>
              <Field label="Username" htmlFor="username"><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">@</span><input className={`${inputClass} pl-9`} id="username" name="username" value={formData.username} onChange={handleChange} required placeholder="username" /></div></Field>
              <Field label="Gender" htmlFor="gender"><select className={inputClass} id="gender" name="gender" value={formData.gender} onChange={handleChange} required><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></Field>
              <Field label="Birthday" htmlFor="birthdate"><div className="relative"><CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input className={`${inputClass} pl-11 [color-scheme:dark]`} type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} required /></div></Field>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Your story</h2><p className="mt-1 text-sm text-slate-500">What are you building, and what do you bring?</p></div><span className="text-xs font-medium text-slate-500">{formData.bio.length}/500</span></div>
            <textarea className={`${inputClass} min-h-36 resize-none py-4 leading-6`} id="bio" name="bio" value={formData.bio} onChange={handleChange} required maxLength={500} placeholder="Share your background, ambitions, and what you’re looking for in a co-founder..." />
          </section>

          {error && <div role="alert" className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-300"><AlertCircle className="h-5 w-5 shrink-0 text-red-400" />{error}</div>}

          <div className="sticky bottom-4 flex flex-col-reverse gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-slate-500"><Check className="h-4 w-4 text-blue-400" /> Changes update your public profile.</p>
            <div className="flex gap-3"><button type="button" onClick={() => router.back()} className="min-h-11 flex-1 rounded-xl border border-slate-700 px-5 text-sm font-semibold text-slate-300 hover:bg-slate-800 sm:flex-none">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none">{saving ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</> : <><Save className="h-4 w-4" /> Save changes</>}</button></div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div><label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-slate-300">{label}</label>{children}</div>;
}
