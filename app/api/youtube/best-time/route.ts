import { apiSuccess, apiError } from "@/lib/api/response";
import { fetchChannelAnalytics } from "@/lib/youtube/analytics-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get("channelId") ?? undefined;
    const analytics = await fetchChannelAnalytics(channelId);
    return apiSuccess(
      {
        bestTime: analytics?.bestTime,
        weeklyHeatmap: analytics?.weeklyHeatmap,
        usAudiencePercentage: analytics?.usAudiencePercentage,
      },
      "Best upload time recommendations fetched successfully"
    );
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to retrieve upload time recommendation",
      500
    );
  }
}
