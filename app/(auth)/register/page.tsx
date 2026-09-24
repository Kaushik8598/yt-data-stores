import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { CommonCard } from "@/components/common/common-card";
import Link from "next/link";
import { Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account - YT Data Stores",
  description: "Sign up for a new YT Data Stores account",
};

export default function RegisterPage() {
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <CommonCard className="border-border/60">
        <RegisterForm />
      </CommonCard>

      <div className="text-center text-xs text-muted-foreground">
        By clicking create account, you agree to our{" "}
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
