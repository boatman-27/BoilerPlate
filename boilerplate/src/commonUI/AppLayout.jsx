import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout({ showNavbar = true }) {
  console.log("AppLayout rendered");
  return (
    <div className="flex flex-col bg-[#343a40] h-screen overflow-y-auto">
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default AppLayout;
