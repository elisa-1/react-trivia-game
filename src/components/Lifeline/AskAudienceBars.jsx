import { ProgressBar as BSProgressBar } from "react-bootstrap";

const AskAudienceBars = (props) => {
  return (
    <div>
      {props.answers.map((answer, index) => {
        return (
          <div key={`${answer}-${index}`}>
            <p className="m-0 mt-2 text-start">{answer}</p>
            {answer.length > 0 ? (
              <BSProgressBar
                now={
                  answer.includes(props.correctAnswer)
                    ? 61
                    : props.answers.length === 4
                    ? 16
                    : 39
                }
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default AskAudienceBars;
