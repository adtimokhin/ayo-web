import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-peach text-white text-sm py-4 flex flex-col items-center justify-center w-screen">
      <div className="font-display text-xl mb-2">AYO! team</div>
      <div className="mb-2">All rights reserved.</div>
      <a href="mailto:contact@ayo.com" className="underline">
        Contact us
      </a>
    </footer>
  );
};

export default Footer;
