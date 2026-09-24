"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      variant = "default",
      size = "default",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const innerContent = (
      <>
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin shrink-0 mr-1.5" />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-1.5 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-1.5 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </>
    );

    if (href) {
      const isExternalOrApi = href.startsWith("http") || href.startsWith("/api/") || href.startsWith("#");
      if (isExternalOrApi) {
        return (
          <a
            href={href}
            target={target}
            rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
            className={cn(buttonVariants({ variant, size, className }), "cursor-pointer")}
          >
            {innerContent}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }), "cursor-pointer")}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {innerContent}
      </Button>
    );
  }
);

CommonButton.displayName = "CommonButton";
