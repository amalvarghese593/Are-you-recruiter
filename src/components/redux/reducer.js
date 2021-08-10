import { ADD_QUERY, DELETE_QUERY } from "./actions";

const initialState = [];

const queryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_QUERY:
      return [...state, payload];
    case DELETE_QUERY:
      return [...state].filter((e) => e !== "payload");
    default:
      return state;
  }
};

export default queryReducer;
