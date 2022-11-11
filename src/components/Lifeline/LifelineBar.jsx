import Lifeline from "./Lifeline";
import { IoIosPeople, IoIosCall } from "react-icons/io";

const LIFELINE_TYPES = {
  FIFTY_FIFTY: "fifty-fifty",
  CALL_A_FRIEND: "call-a-friend",
  ASK_THE_AUTDIENCE: "ask-the-audience",
};

const LifelineBar = (props) => {
  return (
    <div
      className={`d-flex gap-3 ${props.className}`}
    >
      <Lifeline
        className={`fw-bold ${props.lifelineClassName}`}
        onClick={props.onFiftyFifty}
        type={LIFELINE_TYPES.FIFTY_FIFTY}
      >
        50:50
      </Lifeline>
      <Lifeline
        onClick={props.onAskAudienceLifeline}
        className={props.lifelineClassName}
        type={LIFELINE_TYPES.ASK_THE_AUTDIENCE}
      >
        <IoIosPeople className="h-75 w-75" />
      </Lifeline>
      <Lifeline
        onClick={props.onCallFriendLifeline}
        className={props.lifelineClassName}
        type={LIFELINE_TYPES.CALL_A_FRIEND}
      >
        <IoIosCall className="h-75 w-75" />
      </Lifeline>
    </div>
  );
};

export default LifelineBar;
