"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type {
  YouTubeAnalyticsResponse,
  ConnectedYouTubeChannel,
} from "@/types/youtube";
import { toast } from "sonner";

const YOUTUBE_ANALYTICS_KEY = ["youtube-analytics"] as const;
const YOUTUBE_CHANNELS_KEY = ["youtube-channels"] as const;

/**
 * Hook to fetch YouTube analytics for a specific channel
 */
export function useYouTubeAnalytics(channelId?: string) {
  return useQuery({
    queryKey: [...YOUTUBE_ANALYTICS_KEY, channelId ?? "default"],
    queryFn: () => {
      const url = channelId
        ? `/api/youtube/analytics?channelId=${encodeURIComponent(channelId)}`
        : "/api/youtube/analytics";
      return apiClient<YouTubeAnalyticsResponse>(url);
    },
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch all connected YouTube channels on the user's account
 */
export function useYouTubeChannels() {
  return useQuery({
    queryKey: YOUTUBE_CHANNELS_KEY,
    queryFn: () => apiClient<ConnectedYouTubeChannel[]>("/api/youtube/channels"),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to switch the selected active channel from the header
 */
export function useSwitchChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId: string) =>
      apiClient("/api/youtube/channels", {
        method: "POST",
        body: JSON.stringify({ channelId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: YOUTUBE_CHANNELS_KEY });
      queryClient.invalidateQueries({ queryKey: YOUTUBE_ANALYTICS_KEY });
      toast.success("Channel Switched", {
        description: "Switched active analytics channel",
      });
    },
    onError: (err: Error) => {
      toast.error("Failed to switch channel", {
        description: err?.message ?? "An error occurred while switching channels",
      });
    },
  });
}
