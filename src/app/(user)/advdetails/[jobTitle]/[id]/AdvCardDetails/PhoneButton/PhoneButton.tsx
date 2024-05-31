"use client";
import { track } from "@vercel/analytics";

import React, { useState } from "react";
import { buttonStyles } from "../consts";

export default function PhoneButton({ phoneNumber }: { phoneNumber: string }) {
  const [isNumberRevealed, setIsNumberRevealed] = useState(false);

  const info = !isNumberRevealed ? "Odkryj numer telefonu" : phoneNumber;
  const isAnchorClickable = isNumberRevealed ? "" : "pointer-events-none";

  const handleClick = () => {
    track("phone_button_click");
    !isNumberRevealed ? setIsNumberRevealed(true) : null;
  };

  return (
    <button
      className={`${buttonStyles} bg-light-blue hover:bg-dark-blue`}
      onClick={handleClick}
      id="gtm-phone-button"
      disabled={isNumberRevealed}
    >
      <a href={`tel:${phoneNumber}`} className={`block ${isAnchorClickable}`}>
        {info}
      </a>
    </button>
  );
}
