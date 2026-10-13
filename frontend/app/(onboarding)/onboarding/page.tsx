"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import WelcomeStep from "./components/welcome";
import FeaturesStep from "./components/features";
import GetStartedStep from "./components/GetStarted";
import { useAuthStore } from "@/stores/useAuthStore";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const { user, setOnboarding } = useAuthStore();
  const router = useRouter();

  const hasCompletedOnboarding = user?.onboarding === false;

  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace("/home");
    }
  }, [hasCompletedOnboarding, router]);

  const handleFinish = () => {
    setOnboarding(false);
    router.replace("/home");
  };

  // Prevent completed users from seeing the onboarding steps.
  if (hasCompletedOnboarding) {
    return null;
  }

  switch (step) {
    case 1:
      return <WelcomeStep onNext={() => setStep(2)} />;

    case 2:
      return (
        <FeaturesStep onBack={() => setStep(1)} onNext={() => setStep(3)} />
      );

    case 3:
      return (
        <GetStartedStep onBack={() => setStep(2)} onFinish={handleFinish} />
      );

    default:
      return null;
  }
}
