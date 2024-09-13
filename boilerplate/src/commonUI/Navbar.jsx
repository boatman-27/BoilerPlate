import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accountStatus, user } = useUser();
  const location = useLocation();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks =
    user?.userrole === "student"
      ? [
          { to: "/quiz/previous-results", label: "Previous Sessions Results" },
          { to: "/account/edit-profile", label: "Account" },
          { to: "/contact", label: "Contact Us" },
        ]
      : [{ to: "/admin/manage-site", label: "Manage Site" }];

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-md sm:text-2xl font-semibold dark:text-white">
              Generic Navbar title
            </span>
          </NavLink>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={handleToggleMenu}
          >
            <span className="sr-only">Open main menu</span>
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
        </div>

        {accountStatus ? (
          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-[#ff8c9d]  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-[#ff8c9d] ${
                      location.pathname.includes(link.to)
                        ? "dark:text-custom-pink"
                        : "dark:text-white"
                    }`}
                    aria-current="page"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <button
            type="button"
            className="mb-2 me-2 w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:mx-0 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <NavLink to="/account/login">Sign In</NavLink>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
