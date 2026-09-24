"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { YouTubeAnalyticsResponse } from "@/types/youtube";

const YOUTUBE_ANALYTICS_QUERY_KEY = ["youtube-analytics"] as const;

export function useYouTubeAnalytics() {
  return useQuery({
    queryKey: YOUTUBE_ANALYTICS_QUERY_KEY,
    queryFn: () => apiClient<YouTubeAnalyticsResponse>("/api/youtube/analytics"),
    staleTime: 5 * 60 * 1000,
  });
}
