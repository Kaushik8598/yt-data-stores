"use client";

import * as React from "react";
import { useYouTubeAnalytics } from "@/hooks/use-youtube-analytics";
import { AnalyticsStatsGrid } from "./analytics-stats-grid";
import { BestUploadTimeCard } from "./best-upload-time-card";
import { USAudienceCard } from "./us-audience-card";
import { UploadHeatmap } from "./upload-heatmap";
import { ConnectYouTubeModal } from "./connect-youtube-modal";
import { ChannelSelector } from "./channel-selector";
import { CommonButton } from "@/components/common/common-button";
import { CommonLoader } from "@/components/common/common-loader";
import { CommonPageHeader } from "@/components/common/common-page-header";
import { CommonEmptyState } from "@/components/common/common-empty-state";
import { RefreshCw, Video, PlusCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function AnalyticsDashboardView() {
  const searchParams = useSearchParams();
  const urlChannelId = searchParams.get("channelId") ?? undefined;
  const connectedParam = searchParams.get("connected");
  const errorParam = searchParams.get("error");

  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const { data, isLoading, refetch, isRefetching } = useYouTubeAnalytics(urlChannelId);

  // Show notification if redirected from Google OAuth
  React.useEffect(() => {
    if (connectedParam === "true") {
      toast.success("YouTube Channel Connected!", {
        description: "Your channels and analytics are now synchronized.",
      });
    }
    if (errorParam) {
      toast.error("Connection Failed", {
        description: decodeURIComponent(errorParam),
      });
    }
  }, [connectedParam, errorParam]);

  const handleRefresh = async () => {
    await refetch();
    toast.success("Analytics refreshed", {
      description: "Data updated with the latest US viewership telemetry",
    });
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <CommonLoader size="lg" text="Loading YouTube analytics & channel data..." />
      </div>
    );
  }

  const hasConnected = Boolean(data?.hasConnectedChannel);
  const overview = data?.overview;
  const geography = data?.geography ?? [];
  const bestTime = data?.bestTime;
  const weeklyHeatmap = data?.weeklyHeatmap ?? [];
  const usAudiencePercentage = data?.usAudiencePercentage ?? 0;

  return (
    <div className="space-y-8">
      {/* Top Page Header */}
      <CommonPageHeader
        title="YouTube Analytics & Best Upload Time"
        description={
          hasConnected
            ? `Targeting US audience for: ${overview?.channelTitle ?? "Connected Channel"}`
            : "Connect your YouTube channel to analyze US viewer traffic & peak upload windows"
        }
        action={
          <div className="flex items-center gap-2.5">
            {/* Multi-Channel Selector Dropdown */}
            <ChannelSelector onConnectClick={() => setConnectModalOpen(true)} />

            {hasConnected && (
              <CommonButton
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className={`size-3.5 ${isRefetching ? "animate-spin" : ""}`} />}
                isLoading={isRefetching}
                loadingText="Updating..."
                onClick={handleRefresh}
              >
                Sync
              </CommonButton>
            )}

            <CommonButton
              size="sm"
              leftIcon={<PlusCircle className="size-3.5" />}
              onClick={() => setConnectModalOpen(true)}
            >
              {hasConnected ? "Add Channel" : "Connect YouTube"}
            </CommonButton>
          </div>
        }
      />

      {/* When NO channel is connected or NO data is available -> Clean 'No Data' Empty State */}
      {!hasConnected || !overview ? (
        <div className="space-y-6">
          <CommonEmptyState
            icon={Video}
            title="No YouTube Channel Connected"
            description="No analytics data available yet. Connect your Google account to fetch real-time channel views, US audience geography, and calculate optimal upload times."
            action={
              <CommonButton
                className="bg-red-600 hover:bg-red-700 text-white"
                leftIcon={<Video className="size-4" />}
                onClick={() => setConnectModalOpen(true)}
              >
                Connect YouTube Channel
              </CommonButton>
            }
          />

          {/* Setup guidance banner */}
          <div className="p-4 rounded-xl border border-border bg-card/60 flex items-start gap-3 text-xs text-muted-foreground">
            <AlertCircle className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Google Cloud Console Integration Ready</p>
              <p>
                Add your <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">GOOGLE_CLIENT_ID</code> and{" "}
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">GOOGLE_CLIENT_SECRET</code> into{" "}
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">.env.local</code> to enable 1-click Google OAuth authentication.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Real Channel Connected -> Display Live Analytics */
        <>
          {/* Analytics Stats Grid */}
          <AnalyticsStatsGrid
            overview={overview}
            usPercentage={usAudiencePercentage}
          />

          {/* Best Upload Time Banner */}
          {bestTime ? (
            <BestUploadTimeCard recommendation={bestTime} />
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
              No upload recommendation data calculated yet for this channel.
            </div>
          )}

          {/* Main Analysis Section: Heatmap (2/3 width) and US Geography (1/3 width) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <UploadHeatmap heatmap={weeklyHeatmap} />
            </div>

            <div className="lg:col-span-1">
              <USAudienceCard geography={geography} />
            </div>
          </div>
        </>
      )}

      {/* Connect Modal */}
      <ConnectYouTubeModal
        open={connectModalOpen}
        onOpenChange={setConnectModalOpen}
      />
    </div>
  );
}
