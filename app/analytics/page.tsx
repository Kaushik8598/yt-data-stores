import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AnalyticsDashboardView } from "@/components/analytics/analytics-dashboard-view";
import { Video, BarChart3, LayoutDashboard } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Analytics & Best Upload Time - YT Data Stores",
  description:
    "Analyze YouTube channel views, engaged views, US viewer demographics, and optimal upload times",
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const authResponse = await supabase.auth.getUser();
  const user = authResponse?.data?.user ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <div className="size-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm shadow-red-600/30">
                <Video className="size-4" />
              </div>
              <span>YT Data Stores</span>
            </Link>

            {/* Sub-nav */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard className="size-4" />
                <span>Overview</span>
              </Link>
              <Link
                href="/analytics"
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground transition-colors flex items-center gap-1.5 font-semibold"
              >
                <BarChart3 className="size-4 text-red-500" />
                <span>Analytics & Best Time</span>
              </Link>
            </nav>
          </div>

          <DashboardHeader user={user} />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsDashboardView />
      </main>
    </div>
  );
}
