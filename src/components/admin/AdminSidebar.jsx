import { ADMIN_TABS } from "@/data";

function tabButtonClass(isActive) {
  return `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? "bg-gray-100 text-gray-900 font-medium"
      : "text-gray-600 hover:bg-gray-50"
  }`;
}

function AdminSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 flex-shrink-0">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={tabButtonClass(activeTab === tab.id)}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === tab.id ? "bg-[#FF385C]" : "bg-gray-100"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
