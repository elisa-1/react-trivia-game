import { UI_TEXT } from "../services/constants";
import AuthForm from "../components/AuthForm/AuthForm";

const SignIn = () => {
  const formTitle = "Sign In";
  const formType = "signin";
  const additionalFormText = UI_TEXT.authForm.suggestSignUp;

  return (
    <AuthForm
      formTitle={formTitle}
      formType={formType}
      additionalFormText={additionalFormText}
    />
  );
};

export default SignIn;
