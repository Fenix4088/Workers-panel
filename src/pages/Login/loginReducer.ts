// * Types
import {call, put, takeEvery } from "redux-saga/effects";
import {authApi, LoginDataT, LoginRespT, LogoutRespT} from "../../api/api";
import {AxiosResponse} from "axios";

type ActionsT = ReturnType<typeof setIsLoggedIn>;

type InitialStateT = {
    isLoggedIn: boolean,
}


// * Actions
const sagasLoginActions = {
    LOGIN: "SAGA/LOGIN/LOGIN",
    LOGOUT: "SAGA/LOGIN/LOGOUT"
}

const reducerActions = {
    LOGIN: "loginReducer/LOGIN_STATUS" as const
}

// * Reducer
const initialState: InitialStateT = {
    isLoggedIn: false,
}

export const loginReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const {LOGIN} = reducerActions

    switch (action.type) {
        case LOGIN: {
            return {
                ...state, isLoggedIn: action.status
            }
        }
        default:
            return state;
    }

}

// * AC
export const setIsLoggedIn = (status: boolean) => {
    return {
        type: reducerActions.LOGIN,
        status
    }
}

// * Sagas
export function* loginWatcher() {
    yield takeEvery(sagasLoginActions.LOGIN, loginWorker);
    yield takeEvery(sagasLoginActions.LOGOUT, logoutWorker);
}

export function* loginWorker(action: ReturnType<typeof loginSA>) {
    try {
        const res: AxiosResponse<LoginRespT> = yield call(authApi.login, action.payload);
        yield put(setIsLoggedIn(true));
        //TODO: Show message
        console.log("Nice to see you !");
    } catch(err) {
        yield put(setIsLoggedIn(false));
        //TODO: Show message
        console.log(err.message);
    }
}

export const loginSA = (payload: LoginDataT) => ({
    type: sagasLoginActions.LOGIN,
    payload
} as const)

export function* logoutWorker() {
    try {
        const res: AxiosResponse<LogoutRespT> = yield call(authApi.logout);
        //TODO: Show message
        console.log(res.data.message);
        yield put(setIsLoggedIn(false));
    } catch(err) {
        //TODO: Show message
        console.log(err.message);
        yield put(setIsLoggedIn(true));
    }
}

export const logoutSA = () => ({
    type: sagasLoginActions.LOGOUT,
} as const)