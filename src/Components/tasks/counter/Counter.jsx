import { useEffect, useState } from "react";
import { CounterWrapper } from "./CounterStyled";
import moment from "moment";

const Counter = ({ data, settargetDate }) => {
  const [counter, setcounter] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState(null);
  const targetDate = moment(startDate)
    .add(counter - 1, "day")
    .format("DD MM YYYY");
  settargetDate(
    moment(startDate)
      .add(counter - 1, "day")
      .format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (data) {
      setStartDate(data.startDate);
      setDuration(data.duration);
    }
  }, [data]);

  const increment = () => {
    if (counter !== duration) {
      const resIncrement = counter + 1;
      setcounter(resIncrement);
    }
  };

  const decrement = () => {
    if (counter !== 1) {
      const resDecrement = counter - 1;
      setcounter(resDecrement);
    }
  };

  return (
    <CounterWrapper>
      <div className="CounterInterfaceWrapper">
        <button
          type="button"
          onClick={decrement}
          className="buttonCounter buttonCounterLeft"
        >
          &#60;
        </button>
        <p className="counterNumberContainer">
          <span className="counterDay">{counter}</span>{" "}
          <span className="counterDate">/ {duration}</span>
        </p>
        <button
          type="button"
          onClick={increment}
          className="buttonCounter buttonCounterRight"
        >
          &gt;
        </button>
      </div>

      <p className="counterDate">{targetDate}</p>
    </CounterWrapper>
  );
};

export default Counter;
