"use client";
import { ButtonsCard } from "@/components/ui/tailwindcss-buttons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CustomBtnProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  completed?: boolean;
}

export const CustomBtn = ({
  text = "Get Started",
  className,
  onClick,
  completed,
}: CustomBtnProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ButtonsCard className={className}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.();
          }}
          className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${
            theme === "light" ? "border border-gray-200" : ""
          }`}
          style={{ zIndex: 2 }}
        >
          <span
            className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${
              theme === "light"
                ? "bg-[conic-gradient(from_90deg_at_50%_50%,#93C5FD_0%,#3B82F6_50%,#93C5FD_100%)] opacity-70"
                : "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            }`}
          />
          <span
            className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-6 py-1 text-sm font-medium backdrop-blur-3xl transition-colors
          ${
            completed
              ? theme === "light"
                ? "bg-green-100 text-green-700"
                : "bg-green-900 text-green-300"
              : theme === "light"
              ? "bg-white text-slate-900 border border-gray-200 hover:bg-slate-50"
              : "bg-slate-950 text-white"
          }
        `}
          >
            {text}
          </span>
        </button>
      </ButtonsCard>
    );
  }

  return (
    <ButtonsCard className={className}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick?.();
        }}
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50 ${
          theme === "light" ? "border border-gray-200" : ""
        }`}
        style={{ zIndex: 2 }}
      >
        <span
          className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${
            theme === "light"
              ? "bg-[conic-gradient(from_90deg_at_50%_50%,#93C5FD_0%,#3B82F6_50%,#93C5FD_100%)] opacity-70"
              : "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
          }`}
        />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${
            completed
              ? theme === "light"
                ? "bg-green-100 text-green-700"
                : "bg-green-600 text-white"
              : theme === "light"
              ? "bg-white text-slate-900 border border-gray-200 hover:bg-slate-50"
              : "bg-slate-950 text-white"
          } px-6 py-1 text-sm font-medium backdrop-blur-3xl`}
        >
          {text}
        </span>
      </button>
    </ButtonsCard>
  );
};
