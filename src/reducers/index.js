let defaultState = {totalIncome: 0.0};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SEND_TOTAL_INCOME':
    return Object.assign({}, state, {totalIncome: action.payload});
  default:
    return state;
  }
};

export default mainReducer;
