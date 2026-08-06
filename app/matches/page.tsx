"use client";
import { getPotentialMatches, likeUser } from "@/lib/actions/matches";
import { useEffect, useState } from "react";
import { UserProfile } from "@/app/profile/page";
import { useRouter } from "next/navigation";
import MatchCard from "@/components/MatchCard";
import MatchButtons from "@/components/MatchButtons";
import MatchNotification from "@/components/MatchNotification";
import PageLoader from "@/components/PageLoader";

export default function MatchesPage() {
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      let redirecting = false;

      try {
        const potentialMatchesData = await getPotentialMatches();
        setPotentialMatches(potentialMatchesData);
      } catch (error) {
        if (error instanceof Error && error.message === "Not authenticated.") {
          redirecting = true;
          router.replace("/auth");
        } else {
          console.error(error);
        }
      } finally {
        if (!redirecting) setLoading(false);
      }
    }

    loadUsers();
  }, [router]);

  async function handleLike() {
    if (currentIndex < potentialMatches.length) {
      const likedUser = potentialMatches[currentIndex];

      try {
        const result = await likeUser(likedUser.id);

        if (result.isMatch) {
          setMatchedUser(result.matchedUser!);
          setShowMatchNotification(true);
        }

        setCurrentIndex((prev) => prev + 1);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function handlePass() {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleCloseMatchNotification() {}

  function handleStartChat() {}

  if (loading) {
    return (
      <PageLoader
        message="Finding your best matches"
        description="Comparing skills, goals, and working styles."
      />
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#080b16] px-4 pb-10 pt-28">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-linear-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🤝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No more profiles to show
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check back later for new matches, or try adjusting your preferences!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
          >
            Refresh
          </button>
        </div>
        {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseMatchNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    );
  }

  const currentPotentialMatch = potentialMatches[currentIndex];

  return (
    <main className="min-h-dvh overflow-y-auto bg-[#080b16] pb-10 pt-24 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-200"
              title="Go back"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex-1" />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Discover Matches
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentIndex + 1} of {potentialMatches.length} profiles
            </p>
          </div>
        </header>

        <div className="max-w-md mx-auto">
          <MatchCard user={currentPotentialMatch} />
          <div className="mt-8">
            <MatchButtons onLike={handleLike} onPass={handlePass} />
          </div>
        </div>

        {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseMatchNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    </main>
  );
}
