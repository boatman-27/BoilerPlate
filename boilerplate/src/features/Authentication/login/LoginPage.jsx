import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { login } from "../../../services/apiAccount";
import LoginForm from "./LoginForm";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const queryClient = useQueryClient();
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
    mutationKey: ["login"],
    onSuccess: (data) => {
      if (data.message === "Invalid email or password") {
        toast.error(data.message);
      } else if (data.message === "Login successful") {
        dispatch({ type: "login", payload: data.user });
        queryClient.invalidateQueries(["accountStatus"]);
        navigate("/");
        toast.success(data.message);
      }
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Login failed, please try again.");
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
    <LoginForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={isPending}
      errors={errors}
    />
  );
}

export default LoginPage;
