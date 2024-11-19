import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

function AppLayout() {
  const { accountStatus } = useUser();
  if (!accountStatus)
    return (
      <div className="flex flex-col bg-[#343a40] h-screen overflow-y-auto">
        <Outlet />
      </div>
    );
  return (
    <div className="flex flex-col bg-[#343a40] h-screen overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
