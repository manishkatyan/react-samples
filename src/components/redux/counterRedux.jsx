import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CounterRedux = () => {
  const selectCounterValue = (state) => state.counter.value;
  const dispatch = useDispatch();
  const counter = useSelector(selectCounterValue);

  return (
    <>
      <div>
        <p>
          The state of the counter is stored in Redux store and is changed via a
          reducer.
        </p>
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
        <pre>
          <a
            href="https://github.com/manishkatyan/react-toolkit/blob/master/src/components/redux/counterRedux.jsx"
            rel="noreferrer"
            target="_blank"
          >
            Source Code
          </a>
        </pre>
      </div>
    </>
  );
};

export default CounterRedux;
