import { createClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/response";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return apiError("Unauthorized", 401);
    }

    return apiSuccess({ user }, "Authenticated user retrieved");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Failed to retrieve authenticated user",
      500
    );
  }
}
