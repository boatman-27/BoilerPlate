import { NavLink } from "react-router-dom";
import DarkModeToggle from "../../../commonUI/DarkModeToggle";

function RegisterForm({
  handleSubmit,
  onSubmit,
  onError,
  register,
  errors,
  isLoading,
  watch,
}) {
  return (
    <div className="flex items-center justify-center my-auto">
      <div className="relative w-full rounded-lg bg-white p-4 shadow sm:w-[450px] sm:p-5 md:w-[560px] lg:w-[700px] dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-center rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Register your account
          </h3>
          <DarkModeToggle />
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <div>
              <label
                htmlFor="fName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                name="fName"
                id="fName"
                placeholder="John"
                {...register("fName", {
                  required: "Please enter your first name.",
                })}
              />
            </div>
            <div>
              <label
                htmlFor="lName"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                name="lName"
                id="lName"
                placeholder="Doe"
                {...register("lName", {
                  required: "Please enter your last name.",
                })}
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="email"
                name="username"
                id="username"
                placeholder="name@company.com"
                {...register("username", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
              />
            </div>
            <div>
              <label
                htmlFor="cPassword"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="password"
                name="cPassword"
                id="cPassword"
                placeholder="••••••••"
                {...register("cPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
              />
            </div>
          </div>
          {errors.cPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.cPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <NavLink
              to="/account/login"
              className="dark:text-primary-500 font-medium text-white underline hover:underline"
            >
              log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
