"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: LucideIcon | React.ReactNode;
  rightIcon?: LucideIcon | React.ReactNode;
}

export const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      loadingText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    // Render icon helper
    const renderIcon = (icon: LucideIcon | React.ReactNode) => {
      if (!icon) return null;
      if (typeof icon === "function" || (typeof icon === "object" && "render" in (icon as object))) {
        const IconComponent = icon as LucideIcon;
        return <IconComponent className="size-4 shrink-0" />;
      }
      return icon;
    };

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
            {LeftIcon && <span className="mr-1.5 inline-flex">{renderIcon(LeftIcon)}</span>}
            {children}
            {RightIcon && <span className="ml-1.5 inline-flex">{renderIcon(RightIcon)}</span>}
          </>
        )}
      </Button>
    );
  }
);

CommonButton.displayName = "CommonButton";
