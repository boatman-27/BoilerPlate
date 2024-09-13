import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import AppLayout from "./AppLayout";
import Error from "./Error";
import Loader from "./Loader";

import { checkStatus } from "../services/apiAccount";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

const AccountStatusProvider = () => {
  const { error, isPending } = useQuery({
    queryKey: ["accountStatus"],
    queryFn: checkStatus,
    onSuccess: (data) => {
      if (data.loggedIn) {
        dispatch({ type: "login", payload: data.user });
      } else {
        dispatch({ type: "logout" });
      }
    },
  });

  const { dispatch } = useUser();

  {
    isPending && (
      <div className="flex min-h-screen flex-col bg-[#343a40]">
        <Navbar />
        <Loader />
      </div>
    );
  }

  {
    error && (
      <div className="flex min-h-screen flex-col bg-[#343a40]">
        <Navbar />
        <Error error={error.message} />
      </div>
    );
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AccountStatusProvider;
