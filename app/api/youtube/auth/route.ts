import { NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/youtube/oauth";
import { apiError } from "@/lib/api/response";

export async function GET(request: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return apiError(
        "Google OAuth credentials missing. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local",
        400
      );
    }

    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get("returnUrl") ?? "/analytics";

    const authUrl = getGoogleAuthUrl(returnUrl);
    return NextResponse.redirect(authUrl);
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to initialize Google OAuth flow",
      500
    );
  }
}
