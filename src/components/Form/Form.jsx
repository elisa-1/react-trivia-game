import { Form as BSForm } from "react-bootstrap";
import { UI_TEXT } from "../../services/constants";
import FormCheck from "./FormCheck";
import Button from "../UI/Button";

function CheckExample() {
  return (
    <BSForm>
      <BSForm.Label>{UI_TEXT.selectCategoryMessage}</BSForm.Label>
      <FormCheck id="1">Option 1</FormCheck>
      <FormCheck id="2">Option 2</FormCheck>
      <FormCheck id="3">Option 3</FormCheck>
      <FormCheck id="4">Option 4</FormCheck>
      <Button>Submit</Button>
    </BSForm>
  );
}

export default CheckExample;
