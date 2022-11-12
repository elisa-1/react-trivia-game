import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const SignUp = () => {
  const formTitle = "Sign Up";
  const formType = "signUp";

  return <AuthForm formTitle={formTitle} formType={formType} />;
};

export default SignUp;
