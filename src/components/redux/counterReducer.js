const initialState = { value: 5 };

export default function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action

  switch (action.type) {
    case "counter/increment": {
      // If increment, make a copy of `state`
      return {
        ...state,
        // and update the copy with the new value
        value: state.value + 1,
      };
    }
    case "counter/decrement": {
      return {
        ...state,
        value: state.value - 1,
      };
    }
    // otherwise return the existing state unchanged
    default:
      return state;
  }
}
