import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    } 
      setLoader(false);
  }, [navigate, authStatus, authentication]);

  return loader ? <h1>Loading ...</h1> : <>{children}</>;
};

export default Protected;
