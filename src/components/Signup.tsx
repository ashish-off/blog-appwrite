import React from "react";
import authservice from "../appwrite/auth";
import { data, Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { Button, Logo } from "./index";
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
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to={"/login"}
            className="font-medium transition-all duration-200 hover:underline  "
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
