function ListingSectionNav() {
  return (
    <nav className="sticky top-[5.5rem] z-40 -mx-6 px-6 bg-white border-b border-gray-200 mb-8 py-2">
      <div className="flex items-center gap-8">
        <a
          href="#photos"
          className="pb-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
          Photos
        </a>
        <a
          href="#amenities"
          className="pb-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
          Amenities
        </a>
        <a
          href="#reviews"
          className="pb-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
          Reviews
        </a>
        <a
          href="#location"
          className="pb-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors">
          Location
        </a>
      </div>
    </nav>
  );
}

export default ListingSectionNav;
