import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import RegisterForm from "./RegisterForm";
import { signup } from "../../../services/apiAccount";
import { useUser } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const queryClient = useQueryClient();
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return signup(data);
    },
    mutationKey: ["register"],
    onSuccess: (data) => {
      if (data.message === "Email or ID already exists") {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries("accountStatus");
        dispatch({ type: "register", payload: data.user });
        toast.success(data.message);
        reset();
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed, please try again.");
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
    <RegisterForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={isPending}
      errors={errors}
      watch={watch}
    />
  );
}

export default RegisterPage;
