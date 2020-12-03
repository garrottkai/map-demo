import {
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { allSagas } from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
let _store = null;

function configureStore(initialState) {

  if (!_store) {
    const finalCreateStore = applyMiddleware(
      sagaMiddleware,
    )(createStore);

    const store = finalCreateStore(reducer, initialState);

    sagaMiddleware.run(allSagas);

    _store = store;
  }
  return _store;
}

const store = configureStore();

//const persistor = persistStore(store);

export {
  store,
  //persistor
}
