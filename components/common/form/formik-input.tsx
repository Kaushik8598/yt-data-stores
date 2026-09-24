"use client";

import * as React from "react";
import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormikInputProps
  extends Omit<React.ComponentProps<"input">, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  containerClassName?: string;
  required?: boolean;
}

export function FormikInput({
  name,
  label,
  helperText,
  containerClassName,
  required,
  className,
  ...props
}: FormikInputProps) {
  const [field, meta] = useField(name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Input
        id={name}
        {...field}
        {...props}
        aria-invalid={isError}
        className={cn(isError && "border-destructive focus-visible:ring-destructive/20", className)}
      />
      {isError ? (
        <p className="text-xs font-medium text-destructive">{meta.error}</p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}
