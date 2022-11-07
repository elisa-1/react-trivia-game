import { Button as BSButton } from "react-bootstrap";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <BSButton className={`${props.className} ${classes.button}`}>
      {props.children}
    </BSButton>
  );
};

export default Button;
