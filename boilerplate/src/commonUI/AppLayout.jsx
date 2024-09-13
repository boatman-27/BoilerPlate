import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col bg-[#343a40] h-screen overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
