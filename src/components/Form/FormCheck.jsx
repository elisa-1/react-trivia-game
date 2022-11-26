import { Form as BSForm } from "react-bootstrap";
import classes from "./FormCheck.module.css";

const FormCheck = (props) => {
  const formCheckClasses = `text-white ${classes["form-check"]} ${
    props.children === "" ? classes.empty : ""
  }`;

  return (
    <BSForm.Check
      className={formCheckClasses}
      type="radio"
      label={props.children}
      id={props.id}
      name={props.type}
      defaultChecked={props.defaultChecked}
      onClick={props.onClick}
      disabled={props.children === "" ? true : false}
    />
  );
};

export default FormCheck;
