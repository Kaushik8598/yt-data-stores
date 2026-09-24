import { createClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/response";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return apiError(error.message, 400);
    }

    return apiSuccess(null, "Logged out successfully");
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(error?.message ?? "Internal server error during logout", 500);
  }
}
