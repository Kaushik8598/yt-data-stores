import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiError("Email and password are required", 400);
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return apiError(error.message, 401);
    }

    return apiSuccess(
      {
        user: data.user,
        session: data.session,
      },
      "Logged in successfully"
    );
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(error?.message ?? "Internal server error during login", 500);
  }
}
