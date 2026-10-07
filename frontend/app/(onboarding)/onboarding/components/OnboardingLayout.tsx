"use client";

import { ReactNode } from "react";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  children: ReactNode;
}

export default function OnboardingLayout({
  step,
  totalSteps,
  onBack,
  children,
}: OnboardingLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col px-6 py-6 ">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <div className="w-16">
          {onBack && (
            <button onClick={onBack} className="text-sm font-medium">
              ←
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index + 1 === step ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>

        {/* Keeps the indicator centered */}
        <div className="w-16" />
      </div>

      {/* Step content */}
      <div className="flex flex-1 justify-center items-center  relative">
        <div className="w-full max-w-md ">{children}</div>
      </div>
    </main>
  );
}
