"use client";

import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { FormikInput } from "@/components/common/form/formik-input";
import { CommonButton } from "@/components/common/common-button";
import { useRegister } from "@/hooks/use-auth";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: register, isPending } = useRegister();

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        register({
          email: values.email,
          password: values.password,
          fullName: values.fullName,
        });
      }}
    >
      {() => (
        <Form className="space-y-4">
          <FormikInput
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            required
            autoComplete="name"
          />

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
              autoComplete="new-password"
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

          <FormikInput
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          <CommonButton
            type="submit"
            className="w-full mt-2"
            isLoading={isPending}
            loadingText="Creating account..."
            leftIcon={<UserPlus className="size-4" />}
          >
            Create Account
          </CommonButton>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
