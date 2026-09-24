import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CommonCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  cardClassName?: string;
  contentClassName?: string;
}

export function CommonCard({
  title,
  description,
  headerAction,
  footer,
  children,
  className,
  cardClassName,
  contentClassName,
  ...props
}: CommonCardProps) {
  const hasHeader = Boolean(title || description || headerAction);

  return (
    <Card className={cn("shadow-sm", cardClassName, className)} {...props}>
      {hasHeader && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="space-y-1">
            {title && <CardTitle className="text-lg font-semibold">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
      {footer && <CardFooter className="pt-2">{footer}</CardFooter>}
    </Card>
  );
}
