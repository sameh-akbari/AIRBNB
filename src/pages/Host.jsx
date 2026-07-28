import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HostAbout,
  HostBookings,
  HostConnections,
  HostHeader,
  HostProperties,
  HostReviews,
  HostSidebar,
} from "@/components/host";
import { useAuth } from "@/hooks";
import Unauthorized from "./Errors/Unauthorized";

function isHostRole(user) {
  if (!user?.role) return false;
  return String(user.role).toLowerCase() === "host";
}

function Host() {
  const { user, logOutPanel, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");

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

  if (!isHostRole(user)) {
    return <Unauthorized />;
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <HostHeader user={user} onLogOut={handleLogOut} />
      <div className="max-w-[1760px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          <HostSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            {activeTab === "about" && <HostAbout user={user} />}
            {activeTab === "connections" && <HostConnections user={user} />}
            {activeTab === "bookings" && <HostBookings user={user} />}
            {activeTab === "properties" && <HostProperties user={user} />}
            {activeTab === "review" && <HostReviews user={user} />}
          </main>
        </div>
      </div>
    </section>
  );
}

export default Host;
