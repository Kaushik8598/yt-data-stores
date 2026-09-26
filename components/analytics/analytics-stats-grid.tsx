import * as React from "react";
import { CommonCard } from "@/components/common/common-card";
import { Eye, Heart, Clock, Globe } from "lucide-react";
import type { ChannelOverview } from "@/types/youtube";

interface AnalyticsStatsGridProps {
  overview?: ChannelOverview;
  usPercentage?: number;
}

export function AnalyticsStatsGrid({
  overview,
  usPercentage = 0,
}: AnalyticsStatsGridProps) {
  const totalViews = overview?.totalViews?.toLocaleString() ?? "0";
  const engagedViews = overview?.engagedViews?.toLocaleString() ?? "0";
  const watchTime = overview?.watchTimeHours?.toLocaleString() ?? "0";
  const avgDuration = overview?.averageViewDuration ?? "0m 00s";

  const engagementRatio = overview?.totalViews
    ? Math.round((overview.engagedViews / overview.totalViews) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Views */}
      <CommonCard
        cardClassName="border-border/70 hover:border-red-500/30 transition-colors"
        title={
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Views
          </span>
        }
        headerAction={
          <div className="size-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
            <Eye className="size-4" />
          </div>
        }
      >
        <div className="text-3xl font-extrabold tracking-tight text-foreground">
          {totalViews}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <span>Channel total views</span>
        </div>
      </CommonCard>

      {/* Engaged Views */}
      <CommonCard
        cardClassName="border-border/70 hover:border-emerald-500/30 transition-colors"
        title={
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Engaged Interactions
          </span>
        }
        headerAction={
          <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Heart className="size-4" />
          </div>
        }
      >
        <div className="text-3xl font-extrabold tracking-tight text-foreground">
          {engagedViews}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <span className="font-semibold text-foreground">{engagementRatio}%</span>
          <span>engagement rate</span>
        </div>
      </CommonCard>

      {/* Watch Time & Duration */}
      <CommonCard
        cardClassName="border-border/70 hover:border-blue-500/30 transition-colors"
        title={
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Watch Time (Hours)
          </span>
        }
        headerAction={
          <div className="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock className="size-4" />
          </div>
        }
      >
        <div className="text-3xl font-extrabold tracking-tight text-foreground">
          {watchTime}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <span>Avg duration:</span>
          <span className="font-semibold text-foreground">{avgDuration}</span>
        </div>
      </CommonCard>

      {/* US Audience Share */}
      <CommonCard
        cardClassName="border-border/70 bg-gradient-to-br from-card via-card to-red-500/5 hover:border-amber-500/30 transition-colors"
        title={
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            US Audience Share
          </span>
        }
        headerAction={
          <div className="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Globe className="size-4" />
          </div>
        }
      >
        <div className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <span>{usPercentage}%</span>
          <span className="text-xl">🇺🇸</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium mt-1.5">
          <span>Primary target region</span>
        </div>
      </CommonCard>
    </div>
  );
}
