import React, { useContext } from "react";
import { authContext } from "../Context/authentication";
import Login from "../Login/Login";

export default function ProfuctedRoute({ children }) {
  const { token } = useContext(authContext);

  if (token === null) {
    return <Login />;
  }
  return <>{children}</>;
}
