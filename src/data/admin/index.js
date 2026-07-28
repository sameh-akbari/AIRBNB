export const ADMIN_TABS = [
  { id: "users", label: "Users", icon: "👥" },
  { id: "properties", label: "Properties", icon: "🏠" },
  { id: "bookings", label: "Booking", icon: "📅" },
  { id: "locations", label: "City / Country", icon: "🌍" },
  { id: "amenities", label: "Amenities", icon: "✨" },
  { id: "support", label: "Support", icon: "💬" },
];

export const INITIAL_SUPPORT_MESSAGES = [
  {
    id: 1,
    user: "John Doe",
    subject: "Payment issue",
    message: "I have a problem with my payment...",
    date: "2024-01-18",
    status: "open",
  },
  {
    id: 2,
    user: "Jane Smith",
    subject: "Booking cancellation",
    message: "I need to cancel my booking...",
    date: "2024-01-17",
    status: "resolved",
  },
  {
    id: 3,
    user: "Bob Johnson",
    subject: "Account problem",
    message: "I cannot access my account...",
    date: "2024-01-16",
    status: "open",
  },
];

export const AMENITY_CATEGORIES = ["basic", "premium", "safety"];
