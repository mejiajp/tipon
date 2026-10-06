"use client";

import OnboardingLayout from "./OnboardingLayout";

interface GetStartedStepProps {
  onFinish: () => void;
  onBack: () => void;
}

export default function GetStarted({ onFinish, onBack }: GetStartedStepProps) {
  return (
    <OnboardingLayout step={3} totalSteps={3} onBack={onBack}>
      <div className="text-center flex flex-col justify-center items-center">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl">✓</span>
          </div>

          <h2 className="mt-8 text-3xl font-semibold">You are all set</h2>

          <p className="mt-3 text-muted-foreground">
            Start by adding your first expense and let Tipon keep track of the
            rest.
          </p>
        </div>

        <button
          onClick={onFinish}
          className="absolute bottom-0 full-button bg-primary font-medium"
        >
          Start using Tipon
        </button>
      </div>
    </OnboardingLayout>
  );
}
