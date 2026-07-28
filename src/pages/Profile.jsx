import {
  About,
  Connection,
  Favorite,
  ProfileHeader,
  Sidebar,
  Trips,
} from "@/components/profile";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logOutPanel, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading]);

  const handleLogOut = () => {
    logOutPanel();
    navigate("/", { replace: true });
  };

  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <section className="min-h-screen bg-gray-50">
        <ProfileHeader user={user} onLogOut={handleLogOut} />
        <div className="max-w-[1760px] mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* //!SideBar */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1">
              {activeTab === "about" && <About user={user} />}
              {activeTab === "trip" && <Trips user={user} />}
              {activeTab === "favorite" && <Favorite user={user} />}
              {activeTab === "connection" && <Connection user={user} />}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
