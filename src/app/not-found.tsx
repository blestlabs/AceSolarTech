import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text mb-2">Page Not Found</h2>
      <p className="text-text/60 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </section>
  );
}
