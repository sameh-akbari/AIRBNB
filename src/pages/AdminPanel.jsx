import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminAmenities,
  AdminBookings,
  AdminHeader,
  AdminLocations,
  AdminProperties,
  AdminSidebar,
  AdminSupport,
  AdminUsers,
  isAdminRole,
} from "@/components/admin";
import { useAuth } from "@/hooks";
import Unauthorized from "./Errors/Unauthorized";

function AdminPanel() {
  const { user, logOutPanel, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (!authLoading && user === null) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleLogOut = () => {
    logOutPanel();
    navigate("/", { replace: true });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading…</div>
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  if (!isAdminRole(user)) {
    return (
      <Unauthorized message="You do not have permission to access the admin panel. Only users with admin role can view this page." />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <AdminHeader user={user} onLogout={handleLogOut} />
      <div className="max-w-[1760px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            {activeTab === "users" && <AdminUsers />}
            {activeTab === "properties" && <AdminProperties />}
            {activeTab === "bookings" && <AdminBookings />}
            {activeTab === "locations" && <AdminLocations />}
            {activeTab === "amenities" && <AdminAmenities />}
            {activeTab === "support" && <AdminSupport />}
          </main>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;
