import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AccountStatusProvider from "./commonUI/AccountStatusProvider";

import Error from "./commonUI/Error";
import LoginPage from "./features/Authentication/login/LoginPage";
import RegisterPage from "./features/Authentication/register/RegisterPage";
import ResetPasswordPage from "./features/Authentication/resetPassword/ResetPasswordPage";

const router = createBrowserRouter([
  {
    element: <AccountStatusProvider />,
    errorElement: <Error message="Something went wrong. Please try again." />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
