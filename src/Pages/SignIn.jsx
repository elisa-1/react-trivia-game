import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const SignIn = () => {
  const formTitle = "Sign In";
  const formType = "signIn";

  return <AuthForm formTitle={formTitle} formType={formType} />;
};

export default SignIn;
