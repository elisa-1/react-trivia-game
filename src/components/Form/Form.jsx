import { Form as BSForm } from "react-bootstrap";
import { UI_TEXT } from "../../services/constants";
import FormCheck from "./FormCheck";
import Button from "../UI/Button";
import styles from "./Form.module.css";

const Form = (props) => {
  const formCheckList = props.data.map((item, index) => (
    <FormCheck
      key={item.toLowerCase().replaceAll(" ", "-")}
      id={item.toLowerCase().replaceAll(" ", "-")}
      defaultChecked={index === 0 ? true : false}
      type={props.type}
    >
      {item}
    </FormCheck>
  ));

  return (
    <BSForm
      className={`d-flex justify-content-center flex-column text-white ${styles.form}`}
    >
      <BSForm.Label
        className={`border border-white mb-3 ${styles["form-label"]}`}
      >
        {UI_TEXT.selectCategoryMessage}
      </BSForm.Label>
      {formCheckList}
      <Button className="mt-3">Submit</Button>
    </BSForm>
  );
};

export default Form;
