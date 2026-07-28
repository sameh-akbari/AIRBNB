import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  AdminPanel,
  Experience,
  Home,
  Host,
  ListingDetails,
  Login,
  NotFound,
  Payment,
  Profile,
  Register,
  SearchResult,
  Service,
  Unauthorized,
} from "@/pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="service" element={<Service />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="host" element={<Host />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="s/homes" element={<SearchResult />} />
        <Route path="payment" element={<Payment />} />
        <Route path="register" element={<Register />} />
        <Route path="rooms/:id" element={<ListingDetails />} />
      </Route>

      <Route path="401" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
