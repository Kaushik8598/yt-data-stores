import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CommonPageHeader } from "@/components/common/common-page-header";
import { CommonCard } from "@/components/common/common-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { formatFriendlyDateTime, formatTimeAgo } from "@/lib/utils/date";
import {
  Video,
  Database,
  HardDrive,
  Activity,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { CommonButton } from "@/components/common/common-button";

export const metadata: Metadata = {
  title: "Dashboard - YT Data Stores",
  description: "Overview and analytics of YouTube data stores",
};

export default async function DashboardPage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    user = null;
  }

  if (!user) {
    redirect("/login");
  }

  const userJoinedDate = user?.created_at
    ? formatFriendlyDateTime(user.created_at)
    : "-";

  const userJoinedAgo = user?.created_at
    ? formatTimeAgo(user.created_at)
    : "-";

  const lastSignIn = user?.last_sign_in_at
    ? formatFriendlyDateTime(user.last_sign_in_at)
    : "-";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-lg">
              <div className="size-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm shadow-red-600/30">
                <Video className="size-4" />
              </div>
              <span>YT Data Stores</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground transition-colors flex items-center gap-1.5 font-semibold"
              >
                <LayoutDashboard className="size-4" />
                <span>Overview</span>
              </Link>
              <Link
                href="/analytics"
                className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="size-4 text-red-500" />
                <span>Analytics & Best Time</span>
              </Link>
            </nav>
          </div>

          <DashboardHeader user={user} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <CommonPageHeader
          title="Dashboard"
          description={`Welcome back, ${user?.user_metadata?.full_name ?? user?.email ?? "User"}`}
          action={
            <div className="flex items-center gap-2">
              <Link href="/analytics">
                <CommonButton
                  variant="outline"
                  leftIcon={<BarChart3 className="size-4 text-red-500" />}
                  size="sm"
                >
                  US Analytics & Upload Time
                </CommonButton>
              </Link>
              <Link href="#add-store">
                <CommonButton leftIcon={<Layers className="size-4" />} size="sm">
                  Add YouTube Store
                </CommonButton>
              </Link>
            </div>
          }
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CommonCard
            cardClassName="bg-card border-border/70"
            title={
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Connected Stores
              </span>
            }
            headerAction={<Database className="size-4 text-primary" />}
          >
            <div className="text-2xl font-bold tracking-tight">0</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to connect channels</p>
          </CommonCard>

          <CommonCard
            cardClassName="bg-card border-border/70"
            title={
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Synced Videos
              </span>
            }
            headerAction={<Video className="size-4 text-red-500" />}
          >
            <div className="text-2xl font-bold tracking-tight">0</div>
            <p className="text-xs text-muted-foreground mt-1">Metadata & transcripts</p>
          </CommonCard>

          <CommonCard
            cardClassName="bg-card border-border/70"
            title={
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Database Records
              </span>
            }
            headerAction={<HardDrive className="size-4 text-emerald-500" />}
          >
            <div className="text-2xl font-bold tracking-tight">Supabase</div>
            <p className="text-xs text-muted-foreground mt-1">PostgreSQL cloud storage</p>
          </CommonCard>

          <CommonCard
            cardClassName="bg-card border-border/70"
            title={
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sync Status
              </span>
            }
            headerAction={<Activity className="size-4 text-amber-500" />}
          >
            <div className="text-2xl font-bold tracking-tight text-emerald-500 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Healthy
            </div>
            <p className="text-xs text-muted-foreground mt-1">API routing active</p>
          </CommonCard>
        </div>

        {/* User Session & Account Card (Demonstrating SSR + Moment formatting) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CommonCard
            cardClassName="lg:col-span-2 border-border/70"
            title="Authentication & Session Details"
            description="Server-Side Rendered (SSR) session verified with Supabase"
          >
            <div className="divide-y divide-border/60 text-sm">
              <div className="py-3 flex justify-between items-center">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {user?.id ?? "-"}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-muted-foreground">Email Address</span>
                <span className="font-medium">{user?.email ?? "-"}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium">
                  {user?.user_metadata?.full_name ?? "Not specified"}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> Account Created
                </span>
                <span className="font-medium">
                  {userJoinedDate} ({userJoinedAgo})
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-500" /> Last Sign In
                </span>
                <span className="font-medium">{lastSignIn}</span>
              </div>
            </div>
          </CommonCard>

          <CommonCard
            cardClassName="border-border/70"
            title="Supabase Integration"
            description="Configuration status"
          >
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Your authentication is connected to Supabase Auth with PostgreSQL Row Level Security (RLS) support.
              </p>
              <div className="rounded-lg bg-muted/60 p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Auth Provider:</span>
                  <span className="font-semibold">Supabase Email/Pass</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Session Type:</span>
                  <span className="font-semibold">HTTP-only Cookies (SSR)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Client State:</span>
                  <span className="font-semibold">TanStack Query</span>
                </div>
              </div>

              <Link
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                Open Supabase Dashboard <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </CommonCard>
        </div>
      </main>
    </div>
  );
}
