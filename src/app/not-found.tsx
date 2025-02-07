import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-cerulean-600 dark:text-cerulean-400">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-cerulean-600 hover:bg-cerulean-700 dark:bg-cerulean-700 dark:hover:bg-cerulean-800 text-white font-medium transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
