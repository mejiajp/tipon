"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import WelcomeStep from "./components/welcome";
import FeaturesStep from "./components/features";
import GetStartedStep from "./components/GetStarted";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleFinish = () => {
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
