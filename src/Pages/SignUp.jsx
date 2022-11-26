import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UI_TEXT } from "../services/constants";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserAuth } from "../authContext/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, createUserDoc } = UserAuth();
  const navigate = useNavigate();

  const formTitle = "Sign Up";
  const formType = "signup";
  const additionalFormText = UI_TEXT.authForm.suggestSignIn;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await Promise.all([createUser(email, password), createUserDoc(email)]);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError(UI_TEXT.authFormErrors.alreadyInUse);
      } else {
        setError(err.message);
      }
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
      emailValue={email}
      passwordValue={password}
      error={error}
    />
  );
};

export default SignUp;
