import actions from './constants';

const initialState = {
  history: [],
  activePoints: []
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
    case actions.ADD_ACTIVE_POINTS:
      return {
        ...state,
        activePoints: [
          ...state.activePoints,
          ...action.payload
        ]
      }
    case actions.CLEAR_ACTIVE_POINTS:
      return {
        ...state,
        activePoints: []
      }
    default:
      return state;
  }
}
