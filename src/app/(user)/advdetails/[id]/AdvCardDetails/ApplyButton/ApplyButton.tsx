"use client";

import { track } from "@vercel/analytics";
import { buttonStyles } from "../consts";

const ApplyButton = ({ mail, post }: { mail: string; post: string }) => {
  const subject = `[Twoje imię i nazwisko] Stanowisko: ${post}`;
  const emailBody = `Szanowni Państwo, w odpowiedzi na ofertę pracy na protalu VetPraca przesyłam swoją aplikację na stanowisko: ${post}`;

  return (
    <button
      className={`${buttonStyles} bg-primary hover:bg-primary-dark`}
      onClick={() => {
        track("email_button_click");
        window.open(
          `mailto:${mail}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(emailBody)}`
        );
      }}
      id="gtm-email-button"
    >
      Aplikuj wysyłając maila
    </button>
  );
};

export default ApplyButton;
