import { Form as BSForm } from "react-bootstrap";
import { UI_TEXT } from "../../services/constants";
import FormCheck from "./FormCheck";
import Button from "../UI/Button";
import styles from "./Form.module.css";

function CheckExample() {
  return (
    <BSForm className={`d-flex justify-content-center flex-column text-white ${styles.form}`}>
      <BSForm.Label className={`border border-white mb-1 ${styles["form-label"]}`}>
        {UI_TEXT.selectCategoryMessage}
      </BSForm.Label>
      <FormCheck id="1">Option 1</FormCheck>
      <FormCheck id="2">Option 2</FormCheck>
      <FormCheck id="3">Option 3</FormCheck>
      <FormCheck id="4">Option 4</FormCheck>
      <Button className="mt-1">Submit</Button>
    </BSForm>
  );
}

export default CheckExample;
