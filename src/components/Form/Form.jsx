import { Form as BSForm } from "react-bootstrap";
import { UI_TEXT } from "../../services/constants";

function CheckExample() {
  return (
    <BSForm>
      <BSForm.Label>{UI_TEXT.selectCategoryMessage}</BSForm.Label>
      <BSForm.Check
        type="radio"
        label={"Option 1"}
        id={"option-1"}
        name={"group1"}
      />
      <BSForm.Check
        type="radio"
        label={"Option 2"}
        id={"option-2"}
        name={"group1"}
      />
      <BSForm.Check
        type="radio"
        label={"Option 3"}
        id={"option-3"}
        name={"group1"}
      />
    </BSForm>
  );
}

export default CheckExample;
