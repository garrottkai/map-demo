import actions from './constants';

const initialState = {
  history: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_HISTORY_ITEM:
      return {
        ...state,
        history: [
          ...state.history,
          action.payload
        ]
      };
    case actions.DELETE_HISTORY:
      return {
        ...state,
        history: []
      };
    default:
      return state;
  }
}
