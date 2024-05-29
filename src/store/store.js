import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./rootSaga";

const composeEnhancers = process.env.NODE_ENV !== 'production' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) : compose
    : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

export default store;