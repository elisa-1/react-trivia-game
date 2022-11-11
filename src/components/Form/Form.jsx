import { Form as BSForm } from "react-bootstrap";
import FormCheck from "./FormCheck";
import Button from "../UI/Button";
import styles from "./Form.module.css";

const Form = (props) => {
  const getSelectedCategory = (value) => {
    if (props.onGetSelectedOption) return props.onGetSelectedOption(value);
  };

  const formCheckList = props.data.map((item, index) => (
    <FormCheck
      key={`${item.toLowerCase().replaceAll(" ", "-")}-${index}`}
      id={item.toLowerCase().replaceAll(" ", "-")}
      defaultChecked={props.type === "categories" && index === 0 ? true : false}
      type={props.type}
      onClick={() => getSelectedCategory(item)}
    >
      {item}
    </FormCheck>
  ));

  return (
    <BSForm
      className={`d-flex justify-content-center flex-column text-white ${styles.form}`}
      onSubmit={props.onSubmit}
    >
      <BSForm.Label
        className={`border border-white mb-3 ${styles["form-label"]}`}
      >
        {props.label}
      </BSForm.Label>
      {formCheckList}
      <Button className="mt-3" type="submit">
        Submit
      </Button>
    </BSForm>
  );
};

export default Form;
