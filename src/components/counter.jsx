import React, { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      Hello Counter
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
    </>
  );
}

export default Counter;
