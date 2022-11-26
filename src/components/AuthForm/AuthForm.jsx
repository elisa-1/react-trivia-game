import { useEffect } from "react";
import { Form as BSForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UI_TEXT } from "../../services/constants";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";

const AuthForm = (props) => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-auth"]}`}
    >
      {props.error && <div className={styles.error}>{props.error}</div>}
      <BSForm
        className={`d-flex flex-column justify-content-around p-4 mt-4 bg-white ${styles["auth-form"]}`}
        onSubmit={props.onSubmit}
      >
        <h2 className="text-center my-3">{props.formTitle}</h2>
        <BSForm.Group className="mb-3" controlId="formBasicEmail">
          <BSForm.Label>{UI_TEXT.authForm.emailLabel}</BSForm.Label>
          <BSForm.Control
            required
            value={props.emailValue}
            title={UI_TEXT.authForm.emailText}
            pattern="[a-zA-Z0-9._+-]+@[a-zA-Z0-9_-]+\.+[a-zA-Z0-9-\.]{2,}"
            type="email"
            placeholder="Enter email"
            onChange={(event) => props.onChangeEmail(event.target.value)}
            autoComplete="on"
          />
          {props.formType === "signup" && (
            <BSForm.Text className="text-muted">
              {UI_TEXT.authForm.emailText}
            </BSForm.Text>
          )}
        </BSForm.Group>

        <BSForm.Group className="mb-3" controlId="formBasicPassword">
          <BSForm.Label> {UI_TEXT.authForm.passwordLabel}</BSForm.Label>
          <BSForm.Control
            required
            value={props.passwordValue}
            title={UI_TEXT.authForm.passwordText}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,})$"
            type="password"
            placeholder="Password"
            onChange={(event) => props.onChangePassword(event.target.value)}
            autoComplete="on"
          />
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
