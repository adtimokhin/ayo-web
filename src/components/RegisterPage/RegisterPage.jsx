import React from "react";
import "./RegisterPage.css";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <div className="RegisterPage">
      <h1 className="text-2xl font-bold mb-4">Register Page</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
