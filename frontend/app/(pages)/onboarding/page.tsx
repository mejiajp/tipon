"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import WelcomeStep from "./components/Welcome";
import FeaturesStep from "./components/Features";
import GetStartedStep from "./components/GetStarted";

export default function Page() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleFinish = () => {
    router.replace("/home");
  };

  return (
    <>
      {step === 1 && <WelcomeStep onNext={() => setStep(2)} />}

      {step === 2 && (
        <FeaturesStep onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}

      {step === 3 && (
        <GetStartedStep onBack={() => setStep(2)} onFinish={handleFinish} />
      )}
    </>
  );
}
