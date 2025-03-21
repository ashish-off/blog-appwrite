import React, { useState } from "react";
import { login as authLogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data: any) => {
    setError("");
    try {
      const session = await authservice.login(data);

      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return <div>Login</div>;
};

export default Login;
