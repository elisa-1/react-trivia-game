import { Form as BSForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UI_TEXT } from "../../services/constants";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";

const AuthForm = (props) => {
  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-auth"]}`}
    >
      <BSForm
        className={`d-flex flex-column justify-content-around p-4 mt-4 bg-white  ${styles["auth-form"]}`}
      >
        <h2 className="text-center my-3">{props.formTitle}</h2>
        <BSForm.Group className="mb-3" controlId="formBasicEmail">
          <BSForm.Label>{UI_TEXT.authForm.emailLabel}</BSForm.Label>
          <BSForm.Control type="email" placeholder="Enter email" />
          {props.formType === "signup" && (
            <BSForm.Text className="text-muted">
              {UI_TEXT.authForm.emailText}
            </BSForm.Text>
          )}
        </BSForm.Group>

        <BSForm.Group className="mb-3" controlId="formBasicPassword">
          <BSForm.Label> {UI_TEXT.authForm.passwordLabel}</BSForm.Label>
          <BSForm.Control type="password" placeholder="Password" />
          {props.formType === "signup" && (
            <BSForm.Text className="text-muted">
              {UI_TEXT.authForm.passwordText}
            </BSForm.Text>
          )}
        </BSForm.Group>
        <Button type="submit">Submit</Button>
        <Link
          className={`text-center ${styles["auth-link"]}`}
          to={`/${props.formType === "signin" ? "signup" : "signin"}`}
        >
          {props.additionalFormText}
        </Link>
      </BSForm>
    </main>
  );
};

export default AuthForm;
