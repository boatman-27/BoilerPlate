import { useState, useEffect } from "react";
import Button from "./Button";

function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    // Check localStorage and parse the value correctly
    const savedDarkMode = localStorage.getItem("dark");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false; // Default to false if not found
  });

  useEffect(() => {
    // Apply the dark mode class to the document
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function toggleDarkMode() {
    setDark((prevDark) => !prevDark); // Toggle the dark mode
    localStorage.setItem("dark", JSON.stringify(!dark)); // Store the new value in localStorage
  }

  return (
    <Button onClick={toggleDarkMode} type="dark">
      {dark ? (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.00002C0 4.75562 1.93132 1.9623 4.70701 0.707031L5.65436 1.65438C5.2352 2.51383 5 3.47946 5 4.50002C5 8.08987 7.91015 11 11.5 11C12.5206 11 13.4862 10.7648 14.3456 10.3457L15.293 11.293C14.0377 14.0687 11.2444 16 8 16C3.58172 16 0 12.4183 0 8.00002Z"
            fill="#F1C40F"
          ></path>
          <path
            d="M11.5 7.00003L9 4.50003L11.5 2.00003L14 4.50003L11.5 7.00003Z"
            fill="#F1C40F"
          ></path>
        </svg>
      ) : (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.1"
            d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
            fill="#FFC107"
          ></path>
          <path
            d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
            stroke="#FFC107"
            strokeWidth="2"
          ></path>
          <path
            d="M12 5V3"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17 7L19 5"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19 12H21"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17 17L19 19"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 19V21"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 17L5 19"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5 12H3"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5 5L7 7"
            stroke="#FFC107"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </Button>
  );
}

export default DarkModeToggle;
