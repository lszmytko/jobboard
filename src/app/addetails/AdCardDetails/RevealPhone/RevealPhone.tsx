"use client";

import { useState } from "react";

const revealPhoneText = "Odkryj nr telefonu";
const phoneNumberText = "509-342-512";

const RevealPhone = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <button
      className="block bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-3xl text-3xl"
      onClick={() => setIsRevealed((prev) => !prev)}
    >
      {isRevealed ? phoneNumberText : revealPhoneText}
    </button>
  );
};

export default RevealPhone;
