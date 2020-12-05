import {
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { allSagas } from './sagas';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = applyMiddleware(
  sagaMiddleware,
)(createStore);
const store = finalCreateStore(persistedReducer);
sagaMiddleware.run(allSagas);
const persistor = persistStore(store);

export {
  store,
  persistor
};
