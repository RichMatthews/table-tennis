const initialState = {
  count: 0
}
function reducer(state = initialState, action) {
  console.log('we are going in here');
  if (action.type == 'INCREMENT_COUNTER'){
    return Object.assign({}, state, {count: state.count + 1})
  }
  else if (action.type == 'DECREMENT_COUNTER'){
    return Object.assign({}, state, {count: state.count - 1})
  }
  return state;
}

export default reducer;
