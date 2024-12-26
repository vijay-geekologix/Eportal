import Link from "next/link";

function NotFoundPage(){
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export {NotFoundPage};
