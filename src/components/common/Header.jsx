import { useAuth } from "@/hooks";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logOutPanel } = useAuth();

  function getProfilePath(user) {
    const role = user?.role?.toLowerCase();
    if (role === "super_admin" || role === "admin") return "/admin";
    if (role === "host") return "/host";
    return "/profile";
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-6 pt-2">
          <div className="flex items-center h-20 relative">
            <Link
              to="/"
              className="flex items-center cursor-pointer absolute left-6">
              <img src="/images/air.png" alt="Logo" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 h-full">
              <NavLink to="/" className="header-nav-link">
                <img src="/images/2.png" alt="Homes" className="h-10" />
                <span>Homes</span>
              </NavLink>
              <NavLink to="/experience" className="header-nav-link">
                <img src="/images/3.png" alt="Experiences" className="h-10" />
                <span>Experiences</span>
                <span className="absolute top-0 left-14 bg-[#2224AF] text-white text-[10px] px-[6px] py-[2px] rounded-full font-bold leading-none">
                  NEW
                </span>
              </NavLink>
              <NavLink to="/service" className="header-nav-link">
                <img src="/images/1.png" alt="Services" className="h-10" />
                <span>Services</span>
                <span className="absolute top-0 left-14 bg-[#2224AF] text-white text-[10px] px-[6px] py-[2px] rounded-full font-bold leading-none">
                  NEW
                </span>
              </NavLink>
            </div>
            <div className="flex items-center gap-4 absolute right-6">
              {user && (
                <Link
                  to={getProfilePath(user)}
                  className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                  {user.role}:{user.name}
                </Link>
              )}

              <Link
                to="/host"
                className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-semibold text-gray-900">
                Become a host
              </Link>
              <button
                type="button"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Language">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Language">
                <svg
                  class="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <div
                onClick={() => setShowMenu(!showMenu)}
                class="relative"
                data-header-menu>
                <button
                  type="button"
                  data-header-menu-toggle
                  class="p-2 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"
                  aria-label="Menu"
                  aria-expanded="false">
                  <svg
                    class="w-5 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {showMenu && (
                  <div
                    data-header-menu-panel
                    class="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    {user && (
                      <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <p class="text-sm font-semibold text-gray-900">
                          {user.role}:{user.name}
                        </p>
                      </div>
                    )}

                    <div class="px-4 py-3 border-b border-gray-200">
                      <h3 class="font-semibold text-gray-900">Help Center</h3>
                    </div>
                    <div class="py-2">
                      <a
                        href="host.html"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            class="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span class="text-sm text-gray-900">Become a host</span>
                      </a>
                      <a
                        href="#"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            class="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                        <span class="text-sm text-gray-900">Refer a Host</span>
                      </a>
                      <a
                        href="#"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            class="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <span class="text-sm text-gray-900">
                          Find a co-host
                        </span>
                      </a>
                      <a
                        href="#"
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            class="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                            />
                          </svg>
                        </div>
                        <span class="text-sm text-gray-900">Gift cards</span>
                      </a>
                      {user && (
                        <Link
                          to={getProfilePath(user)}
                          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200">
                          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <svg
                              class="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span class="text-sm text-gray-900">Profile</span>
                        </Link>
                      )}

                      {user ? (
                        <>
                          <button
                            onClick={() => {
                              (logOutPanel(), setShowMenu(false));
                            }}
                            type="button"
                            class="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors">
                            <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg
                                class="w-6 h-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                              </svg>
                            </div>
                            <span class="text-sm text-gray-900">Log out</span>
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/login"
                          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <svg
                              class="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          <span class="text-sm text-gray-900">
                            Log in or sign up
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
