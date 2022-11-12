import { UI_TEXT } from "../services/constants";
import AuthForm from "../components/AuthForm/AuthForm";

const SignUp = () => {
  const formTitle = "Sign Up";
  const formType = "signup";
  const additionalFormText = UI_TEXT.authForm.suggestSignIn;

  return (
    <AuthForm
      formTitle={formTitle}
      formType={formType}
      additionalFormText={additionalFormText}
    />
  );
};

export default SignUp;
