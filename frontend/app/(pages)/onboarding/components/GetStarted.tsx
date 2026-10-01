"use client";

interface GetStartedStepProps {
  onFinish: () => void;
  onBack: () => void;
}

export default function GetStarted({ onFinish, onBack }: GetStartedStepProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <span className="text-3xl">✓</span>
        </div>

        <h2 className="mt-8 text-3xl font-semibold">You're all set</h2>

        <p className="mt-3 text-muted-foreground">
          Start by adding your first expense and let Tipon keep track of the
          rest.
        </p>

        <button
          onClick={onFinish}
          className="mt-10 w-full rounded-xl bg-primary px-6 py-3 font-medium text-white"
        >
          Start using Tipon
        </button>

        <button
          onClick={onBack}
          className="mt-3 w-full rounded-xl px-6 py-3 font-medium"
        >
          Back
        </button>
      </div>
    </main>
  );
}
