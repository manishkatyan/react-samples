import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CounterRedux = () => {
  const selectCounterValue = (state) => state.counter.value;
  const dispatch = useDispatch();
  const counter = useSelector(selectCounterValue);

  return (
    <>
      <div>
        <div>
          <div style={{ fontSize: 60, fontWeight: 600 }}>{counter}</div>
          <button
            className="btn btn-primary m-2"
            aria-label="Increment value"
            disabled={counter === 10 ? "disabled" : ""}
            onClick={() => dispatch({ type: "counter/increment" })}
          >
            +
          </button>

          <button
            className="btn btn-secondary m-2"
            aria-label="Decrement value"
            disabled={counter === 0 ? "disabled" : ""}
            onClick={() => dispatch({ type: "counter/decrement" })}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
};

export default CounterRedux;
