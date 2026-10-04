"use client";

import OnboardingLayout from "./OnboardingLayout";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeStepProps) {
  return (
    <OnboardingLayout step={1} totalSteps={3}>
      <div className="text-center">
        <h1 className="font-title text-6xl text-primary">tipon</h1>

        <h2 className="mt-8 text-2xl font-semibold">Welcome to Tipon</h2>

        <p className="mt-3 text-muted-foreground">
          A simple way to keep track of your expenses and understand where your
          money goes.
        </p>

        <button
          onClick={onNext}
          className="mt-10 w-full rounded-xl bg-primary px-6 py-3 font-medium text-white"
        >
          Get Started
        </button>
      </div>
    </OnboardingLayout>
  );
}
