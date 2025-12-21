"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 1200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-[var(--background)]">

      {/* Glass card (same as dashboard cards) */}
      <div className="rounded-2xl border border-[var(--border-color)]
        bg-[var(--card-bg)] px-12 py-10 shadow-xl backdrop-blur-xl">

        <div className="flex flex-col items-center gap-6">

          {/* Loader */}
          <div
            className="h-14 w-14 animate-spin rounded-full
            border-4 border-[var(--primary-soft)]
            border-t-purple-600"
          />

          {/* Text */}
          <p className="text-base font-medium text-slate-600 dark:text-slate-300">
            Loading dashboard…
          </p>

        </div>
      </div>
    </div>
  );
}
