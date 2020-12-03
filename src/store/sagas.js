import {
  all,
  put
} from 'redux-saga/effects';
import actions from './constants';

function* createHistoryItem({ item }) {
  yield put({
    type: actions.CREATE_HISTORY_ITEM,
    payload: item
  });
}

export function* allSagas() {
  yield all([]);
}
