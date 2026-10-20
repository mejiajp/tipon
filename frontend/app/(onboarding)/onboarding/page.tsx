"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import WelcomeStep from "./components/welcome";
import FeaturesStep from "./components/features";
import GetStartedStep from "./components/GetStarted";
import { useAuthStore } from "@/stores/useAuthStore";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const { user, loading, setOnboarding } = useAuthStore();
  const router = useRouter();

  const needOnboarding = user?.onboarding;

  useEffect(() => {
    if (!loading && needOnboarding === false) {
      router.replace("/home");
    }
  }, [loading, needOnboarding, router]);

  if (loading || needOnboarding === false) {
    return null;
  }

  const handleFinish = () => {
    setOnboarding(false);
    router.replace("/home");
  };

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
