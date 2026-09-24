import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CommonButton } from "@/components/common/common-button";
import {
  Video,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Code2,
} from "lucide-react";
import { formatFriendlyDate } from "@/lib/utils/date";

export default async function Home() {
  const supabase = await createClient();
  const authResponse = await supabase.auth.getUser();
  const user = authResponse?.data?.user;

  const currentDate = formatFriendlyDate(new Date());

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-red-500/20 selection:text-red-500">
      {/* Navigation Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <div className="size-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <Video className="size-5" />
            </div>
            <span>YT Data Stores</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <CommonButton rightIcon={<ArrowRight className="size-4" />} size="sm">
                  Go to Dashboard
                </CommonButton>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <CommonButton variant="ghost" size="sm">
                    Sign In
                  </CommonButton>
                </Link>
                <Link href="/register">
                  <CommonButton size="sm" rightIcon={<ArrowRight className="size-4" />}>
                    Get Started
                  </CommonButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center relative overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-red-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-muted/80 border border-border text-foreground">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>Built with Next.js App Router, Supabase & Shadcn UI</span>
            <span className="text-muted-foreground" suppressHydrationWarning>• {currentDate}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Unified Data Stores & Intelligence for{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              YouTube
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Synchronize, organize, and query your YouTube channels, videos, playlists, and analytics directly into Supabase with server-side rendered performance and instant React Query synchronization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            {user ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <CommonButton size="lg" className="w-full sm:w-auto px-8" rightIcon={<LayoutDashboard className="size-4" />}>
                  Open Dashboard
                </CommonButton>
              </Link>
            ) : (
              <>
                <Link href="/register" className="w-full sm:w-auto">
                  <CommonButton size="lg" className="w-full sm:w-auto px-8" rightIcon={<ArrowRight className="size-4" />}>
                    Create Free Account
                  </CommonButton>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <CommonButton size="lg" variant="outline" className="w-full sm:w-auto px-8">
                    Sign In
                  </CommonButton>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
            <div className="size-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="font-semibold text-base">Supabase Authentication</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Secure authentication with HTTP-only cookie sessions, SSR validation, and Row Level Security (RLS) built into PostgreSQL.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Zap className="size-5" />
            </div>
            <h3 className="font-semibold text-base">TanStack React Query</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast, reactive API mutations and queries with automatic background revalidation and instant UI feedback.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs space-y-3">
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Code2 className="size-5" />
            </div>
            <h3 className="font-semibold text-base">Formik & Yup Validation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Robust client-side form state management with strict schema validation, touch detection, and clear error messaging.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p suppressHydrationWarning>© {new Date().getFullYear()} YT Data Stores. All rights reserved.</p>
      </footer>
    </div>
  );
}
