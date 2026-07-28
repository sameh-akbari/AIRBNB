export const SUPER_ADMIN_ROLE_ID = 1;

export function isAdminRole(user) {
  if (!user?.role) return false;
  const role = typeof user.role === "string" ? user.role.toLowerCase() : "";
  return role === "super_admin" || role === "admin" || role.includes("admin");
}

export function isSuperAdminUser(u) {
  if (!u) return false;
  if (Number(u.role_id) === SUPER_ADMIN_ROLE_ID) return true;
  const role = typeof u.role === "string" ? u.role.toLowerCase() : "";
  return role === "super_admin";
}
