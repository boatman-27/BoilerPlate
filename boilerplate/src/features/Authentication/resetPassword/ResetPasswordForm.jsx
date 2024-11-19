import DarkModeToggle from "../../../commonUI/DarkModeToggle";

function ResetPassworForm({
  register,
  handleSubmit,
  onSubmit,
  onError,
  isLoading,
  watch,
}) {
  return (
    <div className="flex my-auto items-center justify-center">
      <div className="relative w-full rounded-lg bg-white p-4 shadow sm:w-[450px] sm:p-5 md:w-[560px] lg:w-[700px] dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-center rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reset Password
          </h3>
          <DarkModeToggle />
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <label
              htmlFor="oldPassword"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Old password
            </label>
            <input
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="••••••••"
              {...register("oldPassword", {
                required: "Please enter your old password",
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Please enter your new password",
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
                Confirm New Password
              </label>
              <input
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="password"
                name="cPassword"
                id="cPassword"
                placeholder="••••••••"
                {...register("cPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassworForm;
