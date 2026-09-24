"use client";

import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { FormikInput } from "@/components/common/form/formik-input";
import { CommonButton } from "@/components/common/common-button";
import { useLogin } from "@/hooks/use-auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: login, isPending } = useLogin();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {() => (
        <Form className="space-y-4">
          <FormikInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <div className="relative">
            <FormikInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[32px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-input text-primary focus:ring-primary/20"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <CommonButton
            type="submit"
            className="w-full mt-2"
            isLoading={isPending}
            loadingText="Signing in..."
            leftIcon={<LogIn className="size-4" />}
          >
            Sign In
          </CommonButton>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
