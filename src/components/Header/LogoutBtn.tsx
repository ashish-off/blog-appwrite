import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import authservice from "../../appwrite/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
