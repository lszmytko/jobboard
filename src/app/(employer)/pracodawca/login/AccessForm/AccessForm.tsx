"use client";

import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AccessForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div className="w-80 rounded-xl px-6 py-10 bg-dark-blue">
        <div className="mb-4">
          <h1 className="text-2xl text-white font-semibold text-center">
            {isLogin ? "Zaloguj się" : "Załóż konto"}
          </h1>
          <h2 className="text-xl text-white font-semibold text-center">
            lub{" "}
            <span
              className="text-primary-light cursor-pointer"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Załóż darmowe konto" : "Zaloguj się"}
            </span>
          </h2>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default AccessForm;
