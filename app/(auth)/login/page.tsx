import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { CommonCard } from "@/components/common/common-card";
import Link from "next/link";
import { Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In - YT Data Stores",
  description: "Sign in to your YT Data Stores account",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left space-y-1">
        {/* Mobile branding */}
        <div className="flex md:hidden items-center justify-center gap-2 mb-4">
          <div className="size-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
            <Video className="size-4" />
          </div>
          <span className="font-bold text-lg">YT Data Stores</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials below to access your account
        </p>
      </div>

      <CommonCard className="border-border/60">
        <LoginForm />
      </CommonCard>

      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
