import { Form as BSForm } from "react-bootstrap";
import Button from "../UI/Button";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["auth-card"]}`}
    >
      <BSForm>
        <BSForm.Group className="mb-3" controlId="formBasicEmail">
          <BSForm.Label>Email address</BSForm.Label>
          <BSForm.Control type="email" placeholder="Enter email" />
          <BSForm.Text className="text-muted">
            We'll never share your email with anyone else.
          </BSForm.Text>
        </BSForm.Group>

        <BSForm.Group className="mb-3" controlId="formBasicPassword">
          <BSForm.Label>Password</BSForm.Label>
          <BSForm.Control type="password" placeholder="Password" />
        </BSForm.Group>
        <Button type="submit">Submit</Button>
      </BSForm>
    </main>
  );
};

export default AuthForm;
