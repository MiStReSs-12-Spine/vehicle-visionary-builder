
import React from "react";
import { cn } from "@/lib/utils";
import Card from "./Card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  glass?: boolean;
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  glass = true,
}: StatsCardProps) => {
  return (
    <Card glass={glass} hover className={cn("", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && trendValue && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "neutral" && "text-blue-500"
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"} {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
