import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { fetchChannelAnalytics } from "@/lib/youtube/analytics-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get("channelId") ?? undefined;

    const analytics = await fetchChannelAnalytics(channelId);
    return apiSuccess(analytics, "YouTube analytics fetched successfully");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to retrieve YouTube analytics",
      500
    );
  }
}
