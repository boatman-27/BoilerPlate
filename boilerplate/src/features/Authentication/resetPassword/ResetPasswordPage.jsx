import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { resetPassword } from "../../../services/apiAccount";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return resetPassword(data);
    },
    onSuccess: (data) => {
      if (data.message == "Reset Password failed") {
        toast.error(data.message);
      } else {
        reset();
        navigate("/login");
        toast.success("Reset Password successful!");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Password reset failed, please try again.");
    },
  });

  const onSubmit = (data) => {
    clearErrors();
    mutate(data);
  };

  const onError = (errors) => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  };
  return (
    <ResetPasswordForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={isLoading}
      errors={errors}
      watch={watch}
    />
  );
}

export default ResetPasswordPage;
