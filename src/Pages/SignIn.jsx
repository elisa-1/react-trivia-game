import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UI_TEXT } from "../services/constants";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserAuth } from "../authContext/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const formTitle = "Sign In";
  const formType = "signin";
  const additionalFormText = UI_TEXT.authForm.suggestSignUp;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError(UI_TEXT.authFormErrors.incorrectPassword);
      }
      if (err.code === "auth/user-not-found") {
        setError(UI_TEXT.authFormErrors.userNotFound);
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

export default SignIn;
