import { apiSuccess, apiError } from "@/lib/api/response";
import { getYouTubeAnalytics } from "@/lib/youtube/analytics-service";

export async function GET() {
  try {
    const analytics = getYouTubeAnalytics();
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
