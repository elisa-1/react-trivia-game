import { Form as BSForm } from "react-bootstrap";
import classes from "./FormCheck.module.css";

const FormCheck = (props) => {
  return (
    <BSForm.Check
      className={`text-white ${classes["form-check"]}`}
      type="radio"
      label={props.children}
      id={props.id}
      name={"group1"}
    ></BSForm.Check>
  );
};

export default FormCheck;
