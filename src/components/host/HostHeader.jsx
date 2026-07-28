import { Link } from "react-router-dom";

function HostHeader({ user, onLogOut }) {
  const displayName = user?.name || user?.email || "?";
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1760px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-[#FF385C]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold text-[#FF385C]">airbnb</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm font-semibold text-gray-700">
                {roleLabel}: {displayName}
              </span>
            )}
            <Link
              to="/host"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Host dashboard
            </Link>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogOut}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              title="Log out"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HostHeader;
