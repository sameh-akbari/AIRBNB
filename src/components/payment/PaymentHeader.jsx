import { Link } from "react-router-dom";

function PaymentHeader() {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="max-w-[1760px] mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-[#FF385C]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold text-[#FF385C]">airbnb</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/rooms/1"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Request to book</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PaymentHeader;
