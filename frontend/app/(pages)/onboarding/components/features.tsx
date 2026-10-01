"use client";

interface FeaturesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Features({ onNext, onBack }: FeaturesStepProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Everything in one place</h2>

          <p className="mt-3 text-muted-foreground">
            Tipon helps you stay on top of your spending.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Feature
            title="Track expenses"
            description="Quickly record what you spend."
          />

          <Feature
            title="Understand your spending"
            description="See where your money is going."
          />

          <Feature
            title="Review your history"
            description="Look back at your spending by date and category."
          />
        </div>

        <div className="mt-10 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border px-6 py-3 font-medium"
          >
            Back
          </button>

          <button
            onClick={onNext}
            className="flex-1 rounded-xl bg-primary px-6 py-3 font-medium text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border p-5">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
