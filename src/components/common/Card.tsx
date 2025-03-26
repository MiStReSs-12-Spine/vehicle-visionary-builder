
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
  hover?: boolean;
}

const Card = ({ className, children, glass = false, hover = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-sm transition-all duration-300",
        glass && "glass",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
