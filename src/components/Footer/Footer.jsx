import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm py-4 flex flex-col items-center justify-center w-screen footer-box relative">
      
      <div className="h-[4px] w-full absolute top-0 bg-[#FE6244]"/>
      <div className="mb-10 text-gray flex flex-col items-center justify-center">
        <p className="font-display text-3xl">AYO! team</p>
        <p className="text-body text-sm">v 0.0.2</p>
      </div>
      <div className="mb-2 text-body">All rights reserved. 2022-2023</div>
      <a
        href="mailto:ayo-notifications@gmail.com"
        target="_blank"
        className="text-body"
        style={{textDecoration: "underline"}}
      >
        Contact us
      </a>
    </footer>
  );
};

export default Footer;
