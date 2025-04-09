"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      // className={cn(
      //   "p-2 rounded-xl border border-neutral-100 dark:bg-black dark:border-white/[0.2] hover:border-neutral-200 group/btn overflow-hidden relative flex items-center justify-center",
      //   className
      // )}
      className={cn("p-2 select-none relative", className)}
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 dark:bg-dot-violet-500/[0.2] bg-dot-amber-400/[0.2]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
