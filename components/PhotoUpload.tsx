"use client";

import { uploadProfilePhoto } from "@/lib/actions/profile";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";

export default function PhotoUpload({
  onPhotoUploaded,
}: {
  onPhotoUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const result = await uploadProfilePhoto(file);
      if (result.success && result.url) {
        onPhotoUploaded(result.url);
        setError(null);
      } else {
        setError(result.error ?? "Failed to upload photo.");
      }
    } catch {
      setError("Failed to change photo");
    } finally {
      setUploading(false);
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="absolute bottom-0 right-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border-2 border-slate-900 bg-violet-600 text-white shadow-lg transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        title="Change photo"
      >
        {uploading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </button>
      {error && (
        <p className="absolute right-0 top-11 z-10 w-52 rounded-lg border border-red-500/25 bg-slate-950 px-3 py-2 text-xs leading-5 text-red-300 shadow-xl">
          {error}
        </p>
      )}
    </div>
  );
}
