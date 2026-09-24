import type { ReactNode } from "react";
import Link from "next/link";
import { Video, ShieldCheck, Database, Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Visual / Branding Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950 text-white p-12 flex-col justify-between border-r border-border/20 relative overflow-hidden">
        {/* Ambient glow effect */}
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        {/* Logo and Brand */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
            <div className="size-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Video className="size-5" />
            </div>
            <span>YT Data Stores</span>
          </Link>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400">
            <Zap className="size-3.5" /> Next.js & Supabase Powered
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            High performance data storage & analytics for YouTube.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Manage your channel channels, video metrics, store syncs, and database records in real-time with SSR speed and instant TanStack Query reactivity.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>Supabase Auth & RLS</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Database className="size-4 text-red-400 shrink-0" />
              <span>Realtime PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} YT Data Stores. Built with Next.js & Shadcn UI.
        </div>
      </div>

      {/* Auth Content Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
}
