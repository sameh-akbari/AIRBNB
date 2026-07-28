function SideBar({ activeTab, onTabChange }) {
  return (
    <>
      <aside className="w-64 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
        <nav className="space-y-2">
          <button
            onClick={() => onTabChange("about")}
            className={`w-full cursor-pointer  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors  ${activeTab === "about" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-lg bg-[#FF385C] flex items-center justify-center flex-shrink-0">
              <span className="text-white">F</span>
            </div>
            <span>About me</span>
          </button>
          <button
            onClick={() => onTabChange("trip")}
            className={`w-full cursor-pointer  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors  ${activeTab === "trip" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="">🧳</span>
            </div>
            <span>Past trips</span>
          </button>
          <button
            onClick={() => onTabChange("favorite")}
            className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors  ${activeTab === "favorite" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="">♥</span>
            </div>
            <span>Favorites</span>
          </button>
          <button
            onClick={() => onTabChange("connection")}
            className={`w-full cursor-pointer  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors  ${activeTab === "connection" ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="">👥</span>
            </div>
            <span>Connections</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
