import { NextRequest, NextResponse } from "next/server";
import { getOAuth2Client } from "@/lib/youtube/oauth";
import { google } from "googleapis";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state") ?? "/analytics";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!code) {
    return NextResponse.redirect(`${appUrl}${state}?error=Missing_auth_code`);
  }

  try {
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user profile from Supabase
    let userId = null;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id ?? null;
    } catch {
      userId = null;
    }

    // Fetch all YouTube channels belonging to this Google Account
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });
    const response = await youtube.channels.list({
      part: ["snippet", "statistics"],
      mine: true,
    });

    const items = response?.data?.items ?? [];

    if (items.length === 0) {
      return NextResponse.redirect(
        `${appUrl}${state}?error=No_YouTube_channel_found_on_this_Google_account`
      );
    }

    // Save tokens and channel records into Supabase if user is logged in
    if (userId) {
      try {
        const supabase = await createClient();

        // 1. Save or update OAuth tokens
        if (tokens.refresh_token) {
          await supabase.from("youtube_tokens").upsert({
            user_id: userId,
            access_token: tokens.access_token ?? "",
            refresh_token: tokens.refresh_token ?? "",
            expiry_date: tokens.expiry_date ?? null,
            scope: tokens.scope ?? "",
            token_type: tokens.token_type ?? "Bearer",
            updated_at: new Date().toISOString(),
          });
        }

        // 2. Save each channel
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const channelId = item?.id ?? "";
          const snippet = item?.snippet;
          const stats = item?.statistics;

          if (channelId) {
            await supabase.from("youtube_channels").upsert({
              user_id: userId,
              channel_id: channelId,
              channel_title: snippet?.title ?? "Untitled Channel",
              description: snippet?.description ?? "",
              custom_url: snippet?.customUrl ?? "",
              thumbnail_url: snippet?.thumbnails?.default?.url ?? "",
              subscriber_count: stats?.subscriberCount ? parseInt(stats.subscriberCount, 10) : 0,
              video_count: stats?.videoCount ? parseInt(stats.videoCount, 10) : 0,
              view_count: stats?.viewCount ? parseInt(stats.viewCount, 10) : 0,
              is_selected: i === 0, // select the first channel by default
              updated_at: new Date().toISOString(),
            });
          }
        }
      } catch (dbError) {
        console.error("Database save error:", dbError);
      }
    }

    // Redirect to analytics with success and the primary channel id
    const firstChannelId = items[0]?.id ?? "";
    return NextResponse.redirect(
      `${appUrl}${state}?connected=true&channelId=${firstChannelId}`
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      `${appUrl}${state}?error=${encodeURIComponent(error?.message ?? "OAuth_failed")}`
    );
  }
}
