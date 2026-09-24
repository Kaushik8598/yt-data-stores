import { apiSuccess, apiError } from "@/lib/api/response";
import { getYouTubeAnalytics } from "@/lib/youtube/analytics-service";

export async function GET() {
  try {
    const analytics = getYouTubeAnalytics();
    return apiSuccess(analytics, "YouTube analytics fetched successfully");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to retrieve YouTube analytics",
      500
    );
  }
}
