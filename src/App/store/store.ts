import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { loginReducer, loginWatcher } from "../../pages/Login/loginReducer";
import { registrationReducer, registrationWatcher } from "../../pages/Registration/registrationReducer";
import { workersTableReducer, workersWatcher } from "../../pages/WorkersTable/workersTableReducer";
import { all } from "redux-saga/effects";
import { appReducer, appWatcher } from "../appReducer";
import {composeWithDevTools} from "redux-devtools-extension";

export type RootStateT = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    workers: workersTableReducer,
    app: appReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield all([loginWatcher(), appWatcher(), registrationWatcher(), workersWatcher()]);
}

