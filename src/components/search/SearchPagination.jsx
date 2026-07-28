function SearchPagination({ currentPage, totalPages, setPage }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-6">
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        type="button"
        disabled={currentPage <= 1}
        className="p-2 rounded-full border border-gray-300 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setPage(page)}
          className={`w-10 h-10 rounded-full cursor-pointer border-2 font-semibold transition-colors border-gray-900 ${currentPage === page ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} `}>
          {page}
        </button>
      ))}

      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        type="button"
        className="p-2 rounded-full border border-gray-300 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchPagination;
