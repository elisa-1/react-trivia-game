import { useState } from "react";
import { UI_TEXT } from "../services/constants";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserAuth } from "../authContext/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const formTitle = "Sign Up";
  const formType = "signup";
  const additionalFormText = UI_TEXT.authForm.suggestSignIn;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createUser(email, password);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  return (
    <AuthForm
      formTitle={formTitle}
      formType={formType}
      additionalFormText={additionalFormText}
      onSubmit={handleSubmit}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
    />
  );
};

export default SignUp;
