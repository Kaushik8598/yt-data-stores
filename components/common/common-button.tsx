"use client";

import * as React from "react";
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
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin shrink-0 mr-1.5" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-1.5 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-1.5 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </Button>
    );
  }
);

CommonButton.displayName = "CommonButton";
