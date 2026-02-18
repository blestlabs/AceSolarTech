'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Something went wrong</h1>
      <p className="text-text/60 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </section>
  );
}
