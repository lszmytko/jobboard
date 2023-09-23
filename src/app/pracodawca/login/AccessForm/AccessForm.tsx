"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

import { paths } from "@/common/paths";
import FullPageLoader from "@/app/_components/FullPageLoader";

import { loginUser } from "./loginUser";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AccessForm = () => {
  const router = useRouter();
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log("success");
      router.push(paths.pracodawca);
    },
  });

  const [isLogin, setIsLogin] = useState(true);

  if (isLoading) return <FullPageLoader />;

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
        {isLogin ? <LoginForm mutateAsync={mutateAsync} /> : <RegisterForm />}
      </div>
      {isError && (
        <div className="text-red-500 mt-4 text-center">Wystąpił błąd</div>
      )}
    </div>
  );
};

export default AccessForm;
