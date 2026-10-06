"use client";

import OnboardingLayout from "./OnboardingLayout";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeStepProps) {
  return (
    <OnboardingLayout step={1} totalSteps={3}>
      <div className="text-center flex flex-between justify-between ">
        <div>
          <h1 className="font-title text-6xl text-primary">tipon</h1>

          {/* <h2 className="mt-8 text-2xl font-semibold">Welcome to Tipon</h2> */}

          <p className="mt-3 ">
            A simple way to keep track of your expenses and understand where
            your money goes.
          </p>
        </div>

        <button
          onClick={onNext}
          className="absolute bottom-0 full-button bg-primary font-medium "
        >
          Get Started
        </button>
      </div>
    </OnboardingLayout>
  );
}
