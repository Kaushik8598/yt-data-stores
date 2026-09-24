import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

/**
 * Standard success response helper for Next.js Route Handlers
 */
export function apiSuccess<T>(
  data?: T,
  message: string = "Success",
  status: number = 200
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Standard error response helper for Next.js Route Handlers
 */
export function apiError(
  message: string = "An error occurred",
  status: number = 400,
  errors?: unknown
) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
