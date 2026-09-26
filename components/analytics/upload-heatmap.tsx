"use client";

import * as React from "react";
import { CommonCard } from "@/components/common/common-card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { DayActivityHeatmap, HourlyAudienceActivity } from "@/types/youtube";

interface UploadHeatmapProps {
  heatmap?: DayActivityHeatmap[];
}

export function UploadHeatmap({ heatmap = [] }: UploadHeatmapProps) {
  const [selectedTimezone, setSelectedTimezone] = React.useState<"IST" | "EST">("IST");
  const [hoveredCell, setHoveredCell] = React.useState<{
    day: string;
    hour: HourlyAudienceActivity;
  } | null>(null);

  const getCellColor = (level: HourlyAudienceActivity["activityLevel"]) => {
    switch (level) {
      case "peak":
        return "bg-emerald-500 text-white shadow-xs hover:ring-2 hover:ring-emerald-400";
      case "high":
        return "bg-emerald-600/60 text-white hover:ring-2 hover:ring-emerald-500";
      case "moderate":
        return "bg-blue-600/30 text-blue-200 hover:ring-2 hover:ring-blue-400";
      default:
        return "bg-muted/40 text-muted-foreground/40 hover:bg-muted";
    }
  };

  return (
    <CommonCard
      cardClassName="border-border/70 overflow-hidden"
      title={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                Weekly Viewer Activity Heatmap
              </span>
              <Badge variant="outline" className="text-xs bg-muted">
                7 Days × 24 Hours
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Darker green cells represent peak hours when US viewers are browsing YouTube
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted border border-border shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedTimezone("IST")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedTimezone === "IST"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🇮🇳 IST (India)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTimezone("EST")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedTimezone === "EST"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🇺🇸 EST (New York)
            </button>
          </div>
        </div>
      }
    >
      {/* Legend & Hover Banner - Fixed height container to prevent layout shift */}
      <div className="min-h-[44px] flex flex-wrap items-center justify-between gap-3 py-2 border-b border-border/60 text-xs">
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-muted-foreground font-medium">Activity Level:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="size-3 rounded-sm bg-muted/40" />
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="size-3 rounded-sm bg-blue-600/30" />
              <span className="text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="size-3 rounded-sm bg-emerald-600/60" />
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="size-3 rounded-sm bg-emerald-500" />
              <span className="font-semibold text-emerald-500">Peak Upload</span>
            </div>
          </div>
        </div>

        {/* Stable Fixed-Height Info Slot (both states are strictly h-8 to prevent ANY card expansion) */}
        <div className="h-8 flex items-center shrink-0 overflow-hidden">
          {hoveredCell ? (
            <div className="h-8 text-xs font-medium text-foreground bg-muted/70 px-2.5 rounded-md border border-border flex items-center gap-2 transition-opacity">
              <Clock className="size-3.5 text-primary shrink-0" />
              <span>
                {hoveredCell.day} at{" "}
                {selectedTimezone === "IST"
                  ? hoveredCell.hour.hourDisplayIST
                  : hoveredCell.hour.hourDisplayEST}{" "}
                ({selectedTimezone})
              </span>
              <span className="text-muted-foreground shrink-0">• Score: {hoveredCell.hour.activityScore}/100</span>
            </div>
          ) : (
            <div className="h-8 text-xs text-muted-foreground/70 italic px-2.5 rounded-md border border-transparent flex items-center gap-2">
              <Clock className="size-3.5 opacity-40 shrink-0" />
              <span>Hover over any cell to see exact timing & score</span>
            </div>
          )}
        </div>
      </div>

      {/* Heatmap Grid or Empty State */}
      {heatmap.length === 0 ? (
        <div className="py-12 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
          <Clock className="size-8 text-muted-foreground/40" />
          <p>No activity heatmap data available yet for this channel.</p>
        </div>
      ) : (
        <div className="pt-4 overflow-x-auto">
          <div className="min-w-[680px] space-y-2">
            {/* Header hours label */}
            <div className="flex items-center text-[10px] text-muted-foreground font-mono pl-20 pr-1">
              <span className="w-1/4">12 AM (Midnight)</span>
              <span className="w-1/4">06 AM (Morning)</span>
              <span className="w-1/4">12 PM (Noon)</span>
              <span className="w-1/4 text-right">06 PM - 11 PM (Evening)</span>
            </div>

            {heatmap.map((day) => (
              <div key={day.dayName} className="flex items-center gap-2">
                {/* Day Name */}
                <div className="w-20 text-xs font-semibold text-muted-foreground truncate">
                  {day.dayName.slice(0, 3)}
                </div>

                {/* 24 Hours Bars */}
                <div className="flex-1 grid grid-cols-24 gap-1">
                  {day.hours.map((hour) => {
                    const colorClass = getCellColor(hour.activityLevel);
                    const isHovered =
                      hoveredCell?.day === day.dayName &&
                      hoveredCell?.hour?.hour24 === hour.hour24;
                    const timeLabel =
                      selectedTimezone === "IST"
                        ? hour.hourDisplayIST
                        : hour.hourDisplayEST;

                    return (
                      <div key={hour.hour24} className="relative">
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredCell({ day: day.dayName, hour })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-full h-7 rounded-sm transition-all cursor-pointer relative flex items-center justify-center text-[9px] font-mono ${colorClass}`}
                          title={`${day.dayName} ${timeLabel} - Activity: ${hour.activityLevel} (${hour.activityScore}%)`}
                        >
                          {hour.activityLevel === "peak" && (
                            <span className="size-1 rounded-full bg-white animate-ping" />
                          )}
                        </button>

                        {/* Floating tooltip above the cell */}
                        {isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none z-30 whitespace-nowrap rounded-md bg-popover/95 px-2 py-1 text-xs text-popover-foreground shadow-md border border-border backdrop-blur-xs animate-in fade-in zoom-in-95">
                            <div className="font-semibold text-[10px]">
                              {day.dayName} {timeLabel}
                            </div>
                            <div className="text-[9px] text-muted-foreground">
                              Score: {hour.activityScore}/100 ({hour.activityLevel})
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CommonCard>
  );
}
