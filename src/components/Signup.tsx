import React from "react";
import authservice from "../appwrite/auth";
import { data, Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { Button } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const nevigate = useNavigate();
  const [error, setError] = React.useState<string | null>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data: any) => {
    setError("");

    try {
      const userData = await authservice.createAccount(data);

      if (userData) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(login(userData));
        nevigate("/");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };
  return <div>Signup</div>;
};

export default Signup;
