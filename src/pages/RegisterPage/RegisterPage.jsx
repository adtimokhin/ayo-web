import React from "react";
import "./RegisterPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage(props) {
  const onError = props.onError;
  return (
    <div className="RegisterPage flex flex-col w-screen bg-primary justify-center items-center py-12">
      <h1 className="text-6xl font-display text-white font-bold">REGISTER!</h1>
      <RegisterForm onError={onError}/>
    </div>
  );
}

export default RegisterPage;
