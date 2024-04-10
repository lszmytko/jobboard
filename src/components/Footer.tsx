import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { socialLinks } from "@/common/consts";

export default function Footer() {
  return (
    <section className="bg-light-blue text-sm text-white p-4 mt-4">
      <div className="flex justify-between gap-2">
        <h1 className="mb-2">
          Vetpraca - portal pracy dla Lekarzy weterynarii i Techników
          weterynarii
        </h1>
        <section className="flex gap-2 text-base mb-2 items-center">
          <a href={socialLinks.facebook} className="cursor-pointer">
            <FaFacebook />
          </a>
          <a href={socialLinks.instagram} className="cursor-pointer">
            <FaInstagram />
          </a>
          <a href={socialLinks.email} className="cursor-pointer">
            <MdEmail />
          </a>
        </section>
      </div>
      <p className="text-xs">Copyright ©2024 VetTech, All rights reserved.</p>
    </section>
  );
}
