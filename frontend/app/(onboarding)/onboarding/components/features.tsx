"use client";

import OnboardingLayout from "./OnboardingLayout";

interface FeaturesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Features({ onNext, onBack }: FeaturesStepProps) {
  return (
    <OnboardingLayout step={2} totalSteps={3} onBack={onBack}>
      <div>
        <div className="flex flex-col flex-between justify-between">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Everything in one place</h2>

            <p className="mt-3 text-muted-foreground">
              Tipon helps you stay on top of your spending.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border p-5">
              <h3 className="font-semibold">Track expenses</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Quickly record what you spend.
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h3 className="font-semibold">Understand your spending</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                See where your money is going.
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h3 className="font-semibold">Review your history</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Look back at your spending over time.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onNext}
          className="absolute bottom-0 full-button bg-primary font-medium"
        >
          Continue
        </button>
      </div>
    </OnboardingLayout>
  );
}
