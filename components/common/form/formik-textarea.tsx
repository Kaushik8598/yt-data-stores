"use client";

import * as React from "react";
import { useField } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormikTextareaProps
  extends Omit<React.ComponentProps<"textarea">, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  containerClassName?: string;
  required?: boolean;
}

export function FormikTextarea({
  name,
  label,
  helperText,
  containerClassName,
  required,
  className,
  ...props
}: FormikTextareaProps) {
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
      <Textarea
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
