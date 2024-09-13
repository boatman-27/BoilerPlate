import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function SideBar({ onOptionSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null); // Track which submenu is open
  const sidebarRef = useRef(null);
  const location = useLocation();
  const { user } = useUser();

  const navLinks = [
    {
      label: "Profile",
      to: "/account/edit-profile",
      children: [
        {
          label: "Change Password",
          to: "/account/edit-profile/change-password",
        },
      ],
    },
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleSubMenu = (label) => {
    setOpenSubMenu(openSubMenu === label ? null : label); // Toggle submenu
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="sidebar"
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <aside
        ref={sidebarRef}
        className={`transform top-0 left-0 w-64 bg-gray-900 dark:bg-gray-900 h-screen fixed transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0 mt-[4.5rem]" : "-translate-x-full"
        } md:translate-x-0 md:relative md:mt-0`}
      >
        <div className="flex flex-col items-start justify-center p-6 space-y-2">
          <img
            src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=826"
            alt="Logo"
            className="w-20 h-20 rounded-full block mx-auto md:w-24 md:h-24"
          />
          <h2 className="text-white text-2xl font-bold text-center w-full">
            {user?.fname} {user?.lname}
          </h2>
          <h2 className="text-white text-lg font-bold mb-4 text-center w-full">
            User ID: {user?.userid}
          </h2>
        </div>

        <div className="flex flex-col items-start justify-center p-6 space-y-6">
          {navLinks.map((link) => (
            <div key={link.to} className="w-full">
              <div className="flex justify-between items-center w-full">
                <NavLink
                  to={link.to}
                  className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-[#ff8c9d] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-[#ff8c9d] ${
                    location.pathname === link.to
                      ? "dark:text-custom-pink"
                      : "dark:text-white"
                  }`}
                  onClick={() => {
                    onOptionSelect(link.label);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </NavLink>
                {link.children && (
                  <button
                    className="focus:outline-none"
                    onClick={() => toggleSubMenu(link.label)}
                  >
                    <svg
                      className={`h-5 w-5 transform transition-transform duration-300 ${
                        openSubMenu === link.label ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {link.children && openSubMenu === link.label && (
                <div className="pl-6 space-y-2">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={`block rounded px-3 py-2 text-gray-900  dark:hover:text-custom-pink  ${
                        location.pathname === child.to
                          ? "dark:text-custom-pink"
                          : "dark:text-gray-400"
                      }`}
                      onClick={() => {
                        onOptionSelect(child.label);
                        setIsMenuOpen(false);
                      }}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
