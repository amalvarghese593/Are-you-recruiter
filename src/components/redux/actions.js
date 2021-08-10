const ADD_QUERY = "ADD_QUERY";
const DELETE_QUERY = "DELETE_QUERY";

const addQuery = (query) => {
  return {
    type: ADD_QUERY,
    payload: query,
  };
};
const deleteQuery = (query) => {
  return {
    type: DELETE_QUERY,
    payload: query,
  };
};

export { addQuery, deleteQuery, ADD_QUERY, DELETE_QUERY };
