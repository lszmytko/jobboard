"use client";

import React, { useState } from "react";
import { buttonStyles } from "../consts";

export default function PhoneButton({ phoneNumber }: { phoneNumber: string }) {
  const [isNumberRevealed, setIsNumberRevealed] = useState(false);

  const info = !isNumberRevealed ? "Odkryj numer telefonu" : phoneNumber;

  const handleClick = () =>
    !isNumberRevealed ? setIsNumberRevealed(true) : null;

  return (
    <button
      className={`${buttonStyles} bg-light-blue hover:bg-dark-blue`}
      onClick={handleClick}
      id="gtm-phone-button"
    >
      {info}
    </button>
  );
}
