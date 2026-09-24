import * as React from "react";
import { CommonCard } from "@/components/common/common-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Info } from "lucide-react";
import type { BestTimeRecommendation } from "@/types/youtube";

interface BestUploadTimeCardProps {
  recommendation?: BestTimeRecommendation;
}

export function BestUploadTimeCard({
  recommendation,
}: BestUploadTimeCardProps) {
  const day = recommendation?.dayOfWeek ?? "Today";
  const timeIST = recommendation?.bestTimeIST ?? "09:00 PM - 11:30 PM IST";
  const timeEST = recommendation?.bestTimeEST ?? "11:30 AM - 02:00 PM EST";
  const timePST = recommendation?.bestTimePST ?? "08:30 AM - 11:00 AM PST";
  const confidence = recommendation?.confidenceScore ?? 94;
  const reason =
    recommendation?.reason ??
    "Peak US viewers become active during late afternoon and evening hours (EST). Uploading 2 hours ahead ensures full transcoding and optimal algorithm push.";
  const boost =
    recommendation?.expectedEngagementBoost ??
    "+38% more initial click-throughs within first 4 hours";

  return (
    <CommonCard
      cardClassName="border-emerald-500/30 bg-gradient-to-br from-card via-card to-emerald-500/5 relative overflow-hidden"
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            🎯 Best Time to Upload for US Audience
          </span>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
            <Sparkles className="size-3 mr-1" /> {confidence}% Optimal
          </Badge>
        </div>
      }
      description={`Recommended schedule for ${day} based on viewer density algorithms`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
        {/* India Standard Time Box */}
        <div className="p-4 rounded-xl bg-background border border-emerald-500/30 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <span>🇮🇳</span> Your Local Time (IST)
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">
              Optimal Upload
            </span>
          </div>
          <div className="text-2xl font-extrabold text-foreground tracking-tight">
            {timeIST}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Publish your video in this window
          </p>
        </div>

        {/* US Eastern Time Box */}
        <div className="p-4 rounded-xl bg-background border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <span>🇺🇸</span> US Eastern (EST / New York)
            </span>
            <span className="text-[10px] text-muted-foreground">UTC-5</span>
          </div>
          <div className="text-xl font-bold text-foreground tracking-tight">
            {timeEST}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            US lunch & pre-afternoon browsing
          </p>
        </div>

        {/* US Pacific Time Box */}
        <div className="p-4 rounded-xl bg-background border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <span>🇺🇸</span> US Pacific (PST / California)
            </span>
            <span className="text-[10px] text-muted-foreground">UTC-8</span>
          </div>
          <div className="text-xl font-bold text-foreground tracking-tight">
            {timePST}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            US West Coast morning traffic
          </p>
        </div>
      </div>

      {/* Strategic Explanation and Boost */}
      <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2 text-muted-foreground max-w-xl">
          <Info className="size-4 shrink-0 text-emerald-500 mt-0.5" />
          <p className="leading-relaxed">{reason}</p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 font-semibold shrink-0">
          <TrendingUp className="size-3.5" />
          <span>{boost}</span>
        </div>
      </div>
    </CommonCard>
  );
}
