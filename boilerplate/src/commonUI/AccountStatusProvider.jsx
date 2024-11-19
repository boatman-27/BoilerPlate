import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import Error from "./Error";
import Loader from "./Loader";

import { checkStatus } from "../services/apiAccount";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";
import LoginPage from "../features/Authentication/login/LoginPage";
import { useEffect } from "react";

const AccountStatusProvider = () => {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const { error, isPending, data } = useQuery({
    queryKey: ["accountStatus"],
    queryFn: checkStatus,
    staleTime: 0,
    onSuccess: (data) => {
      console.log("onSuccess data:", data); // Now this should log data
      if (data.loggedIn) {
        dispatch({ type: "login", payload: data.user });
      } else {
        console.log(data.message || "User is not logged in");
        dispatch({ type: "logout" });
      }
    },
  });
  useEffect(() => {
    if (data?.loggedIn === false) {
      navigate("/account/login");
    }
  }, [data, navigate]);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col bg-[#343a40]">
        <Navbar />
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#343a40]">
        <Navbar />
        <Error error={error.message} />
      </div>
    );
  }

  return (
    <AppLayout showNavbar={data?.loggedIn}>
      <Outlet />
    </AppLayout>
  );
};

export default AccountStatusProvider;
