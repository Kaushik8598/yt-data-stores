import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import type { ConnectedYouTubeChannel } from "@/types/youtube";

export async function GET() {
  try {
    const supabase = await createClient();
    const authResponse = await supabase.auth.getUser();
    const userId = authResponse?.data?.user?.id;

    if (!userId) {
      return apiSuccess<ConnectedYouTubeChannel[]>([], "No authenticated user");
    }

    const { data: channels, error } = await supabase
      .from("youtube_channels")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      return apiError(error.message, 500);
    }

    const mappedChannels: ConnectedYouTubeChannel[] = (channels ?? []).map((c) => ({
      id: c.id,
      channelId: c.channel_id,
      channelTitle: c.channel_title,
      customUrl: c.custom_url,
      thumbnailUrl: c.thumbnail_url,
      subscriberCount: Number(c.subscriber_count ?? 0),
      videoCount: Number(c.video_count ?? 0),
      viewCount: Number(c.view_count ?? 0),
      isSelected: Boolean(c.is_selected),
    }));

    return apiSuccess(mappedChannels, "YouTube channels fetched successfully");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to retrieve connected channels",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channelId } = body;

    if (!channelId) {
      return apiError("channelId is required", 400);
    }

    const supabase = await createClient();
    const authResponse = await supabase.auth.getUser();
    const userId = authResponse?.data?.user?.id;

    if (!userId) {
      return apiError("Unauthorized", 401);
    }

    // Set all channels to unselected
    await supabase
      .from("youtube_channels")
      .update({ is_selected: false })
      .eq("user_id", userId);

    // Set targeted channel to selected
    const { data, error } = await supabase
      .from("youtube_channels")
      .update({ is_selected: true })
      .eq("user_id", userId)
      .eq("channel_id", channelId)
      .select()
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(data, "Channel switched successfully");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(error?.message ?? "Failed to switch channel", 500);
  }
}
