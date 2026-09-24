"use client";

import * as React from "react";
import { useYouTubeAnalytics } from "@/hooks/use-youtube-analytics";
import { AnalyticsStatsGrid } from "./analytics-stats-grid";
import { BestUploadTimeCard } from "./best-upload-time-card";
import { USAudienceCard } from "./us-audience-card";
import { UploadHeatmap } from "./upload-heatmap";
import { ConnectYouTubeModal } from "./connect-youtube-modal";
import { CommonButton } from "@/components/common/common-button";
import { CommonLoader } from "@/components/common/common-loader";
import { CommonPageHeader } from "@/components/common/common-page-header";
import { RefreshCw, PlusCircle } from "lucide-react";
import { toast } from "sonner";

export function AnalyticsDashboardView() {
  const { data, isLoading, refetch, isRefetching } = useYouTubeAnalytics();
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);

  const handleRefresh = async () => {
    await refetch();
    toast.success("Analytics refreshed", {
      description: "Data updated with the latest US viewership telemetry",
    });
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <CommonLoader size="lg" text="Analyzing YouTube viewer activity & US demographics..." />
      </div>
    );
  }

  const overview = data?.overview;
  const geography = data?.geography ?? [];
  const bestTime = data?.bestTime;
  const weeklyHeatmap = data?.weeklyHeatmap ?? [];
  const usAudiencePercentage = data?.usAudiencePercentage ?? 54.2;

  return (
    <div className="space-y-8">
      {/* Top Page Header */}
      <CommonPageHeader
        title="YouTube Analytics & Best Upload Time"
        description={`Targeting US audience for channel: ${overview?.channelTitle ?? "Connected Channel"}`}
        action={
          <div className="flex items-center gap-2">
            <CommonButton
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className={`size-3.5 ${isRefetching ? "animate-spin" : ""}`} />}
              isLoading={isRefetching}
              loadingText="Updating..."
              onClick={handleRefresh}
            >
              Sync Data
            </CommonButton>

            <CommonButton
              size="sm"
              leftIcon={<PlusCircle className="size-3.5" />}
              onClick={() => setConnectModalOpen(true)}
            >
              Connect Channel
            </CommonButton>
          </div>
        }
      />

      {/* Analytics Stats Grid */}
      <AnalyticsStatsGrid
        overview={overview}
        usPercentage={usAudiencePercentage}
      />

      {/* Best Upload Time Banner */}
      <BestUploadTimeCard recommendation={bestTime} />

      {/* Main Analysis Section: Heatmap (2/3 width) and US Geography (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UploadHeatmap heatmap={weeklyHeatmap} />
        </div>

        <div className="lg:col-span-1">
          <USAudienceCard geography={geography} />
        </div>
      </div>

      {/* Connect Modal */}
      <ConnectYouTubeModal
        open={connectModalOpen}
        onOpenChange={setConnectModalOpen}
      />
    </div>
  );
}
