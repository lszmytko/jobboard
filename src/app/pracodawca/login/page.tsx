"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import AccessForm from "./AccessForm";

const EmployerLogin = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) redirect("/sth");
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <AccessForm />
    </div>
  );
};

export default EmployerLogin;
