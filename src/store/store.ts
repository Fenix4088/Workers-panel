import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({

});

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootWatcher);

// function* rootWatcher() {
//     yield all([initializeAppWatcherSaga(), tasksWatcher(), todoListWatcher()])
// }