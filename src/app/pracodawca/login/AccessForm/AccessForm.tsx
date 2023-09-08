"use client";

import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AccessForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-80 bg-dark-blue rounded-xl p-6">
      <div className="mb-4">
        <h1 className="text-2xl text-white font-semibold text-center">
          Zaloguj się
        </h1>
        <h2 className="text-xl text-white font-semibold text-center">
          lub{" "}
          <span
            className="text-primary-light cursor-pointer"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            Załóż darmowe konto
          </span>
        </h2>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AccessForm;
