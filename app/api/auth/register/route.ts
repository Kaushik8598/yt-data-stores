import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    if (!email || !password) {
      return apiError("Email and password are required", 400);
    }

    if (password.length < 6) {
      return apiError("Password must be at least 6 characters long", 400);
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName ?? "",
        },
      },
    });

    if (error) {
      return apiError(error.message, 400);
    }

    // If user is created and session is immediately available
    return apiSuccess(
      {
        user: data?.user,
        session: data?.session,
      },
      "Account registered successfully. Please check your email to verify your account if required."
    );
  } catch (err: unknown) {
    const error = err as Error;
    return apiError(
      error?.message ?? "Internal server error during registration",
      500
    );
  }
}
