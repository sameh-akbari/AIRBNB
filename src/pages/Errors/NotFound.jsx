import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
          <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-rose-50 text-[#FF385C]">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-center mt-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800">
              404
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-800">
              Page not found
            </p>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
              Go back
            </button>
            <Link
              to="/"
              replace
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF385C] text-white hover:bg-[#E61E4D] transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
