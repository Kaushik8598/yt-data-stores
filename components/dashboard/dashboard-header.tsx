"use client";

import * as React from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { CommonButton } from "@/components/common/common-button";
import { useLogout } from "@/hooks/use-auth";
import type { User } from "@supabase/supabase-js";

export function DashboardHeader({ user }: { user: User | null }) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex items-center gap-3">
      {user && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground border border-border">
          <UserIcon className="size-3.5 text-primary" />
          <span>{user.email}</span>
        </div>
      )}
      <CommonButton
        variant="outline"
        size="sm"
        leftIcon={<LogOut className="size-4" />}
        isLoading={isPending}
        loadingText="Logging out..."
        onClick={() => logout()}
      >
        Sign Out
      </CommonButton>
    </div>
  );
}
