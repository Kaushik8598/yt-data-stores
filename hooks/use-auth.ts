"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthResponse {
  user: User;
  session?: Session | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  fullName?: string;
}

const AUTH_QUERY_KEY = ["auth-user"] as const;

/**
 * Hook to get the currently authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => apiClient<{ user: User }>("/api/auth/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to perform login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiClient<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      toast.success("Welcome back!", {
        description: `Logged in as ${data?.user?.email ?? ""}`,
      });
      if (data?.user) {
        queryClient.setQueryData(AUTH_QUERY_KEY, { user: data.user });
      }
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error("Login failed", {
        description: error?.message ?? "Invalid email or password",
      });
    },
  });
}

/**
 * Hook to perform registration
 */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      apiClient<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      toast.success("Account created successfully!", {
        description: data?.session
          ? "You are now logged in"
          : "Please verify your email address to log in",
      });
      if (data?.session && data?.user) {
        queryClient.setQueryData(AUTH_QUERY_KEY, { user: data.user });
        router.push("/dashboard");
        router.refresh();
      } else {
        router.push("/login");
      }
    },
    onError: (error: Error) => {
      toast.error("Registration failed", {
        description: error?.message ?? "Could not create account",
      });
    },
  });
}

/**
 * Hook to perform logout
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient<null>("/api/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
      router.push("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error("Logout failed", {
        description: error?.message ?? "Could not log out",
      });
    },
  });
}
