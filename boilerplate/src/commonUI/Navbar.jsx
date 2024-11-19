import { NavLink, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";

function Navbar() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/teams", label: "For Teams" },
    {
      label: "Resources",
      children: [
        { to: "/resources/integration", label: "Integrations" },
        { to: "/resources/templates", label: "Templates" },
        { to: "/resources/help-center", label: "Help Center" },
        {
          to: "/resources/methods",
          label: "Productivity Methods + Quiz",
        },
        { to: "/resources/inspiration", label: "Inspiration Hub" },
        { to: "/resources/downloads", label: "Downloads" },
      ],
    },
    { to: "/pricing", label: "Pricing" },
  ];

  const toggleSubmenu = (index) => {
    // If the submenu is already open, close it; otherwise, open it
    setOpenSubmenu((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null); // Also close any open submenus
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef} className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={closeMenu} // Close the menu when navigating
          >
            <span className="self-center whitespace-nowrap text-2xl font-bold text-red-600">
              Listful
            </span>
          </NavLink>

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={menuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:items-center`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
            {navLinks.map((link, index) => (
              <li key={link.to || index} className="relative group">
                <div className="relative">
                  <NavLink
                    to={link.to}
                    className={`block rounded px-3 py-2 text-gray-900 md:border-0 md:p-0 md:hover:text-red-600 md:dark:hover:text-red-600 ${
                      location.pathname === link.to ||
                      (link.children &&
                        link.children.some((child) =>
                          location.pathname.includes(child.to)
                        ))
                        ? "dark:text-red-600"
                        : "dark:text-white"
                    }`}
                    aria-current="page"
                  >
                    <button
                      className="flex items-center justify-between w-full p-2 hover:bg-gray-200 dark:hover:bg-gray-400 rounded-md"
                      onClick={(e) => {
                        if (link.children) {
                          e.preventDefault(); // Prevent navigation for parent links with children
                          toggleSubmenu(index);
                        } else {
                          closeMenu(); // Close the menu for regular links
                        }
                      }}
                    >
                      {link.label}
                      {link.children && (
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform ${
                            openSubmenu === index ? "transform rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      )}
                    </button>
                  </NavLink>

                  {link.children && (
                    <ul
                      className={`${
                        openSubmenu === index
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      } transition-all duration-300 ease-in-out overflow-hidden w-full md:w-60 rounded-xl border-gray-200 md:bg-white md:dark:bg-gray-800 p-2 md:absolute relative `}
                    >
                      {link.children.map((child) => (
                        <li key={child.to} className="w-full">
                          <NavLink
                            to={child.to}
                            className="block p-2 text-gray-700 dark:text-gray-400 dark:hover:text-white whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                            onClick={closeMenu} // Close the menu on submenu link click
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center h-6 border-l border-gray-400 mx-4">
            <DarkModeToggle />
            <Button type="primary" customClass="ml-2 tracking-wider">
              <NavLink to="/account/login">Log in</NavLink>
            </Button>
            <Button type="primary" customClass="ml-2 tracking-wider">
              <NavLink to="/account/register">Start for free</NavLink>
            </Button>
          </div>
          <div className="md:hidden flex items-center space-y-2">
            <DarkModeToggle />
            <Button type="primary" customClass="ml-2 tracking-wider">
              <NavLink to="/account/login">Log in</NavLink>
            </Button>
            <Button type="primary" customClass="ml-2 tracking-wider">
              <NavLink to="/account/register">Start for free</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
