// * Types
import {call, put, takeEvery } from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {authApi, AuthRespT} from "../api/api";
import {setIsLoggedIn} from "../pages/Login/loginReducer";

type ActionsT = ReturnType<typeof isAuth>;

type InitialStateT = {
    isAuth: boolean
}

// * Actions
const sagasAppActions = {
    AUTH: "SAGA/APP/AUTH"
}

const reducerActions = {
    AUTH: "appReducer/auth" as const
}

// * Reducer
const initialState: InitialStateT = {
    isAuth: false
}

export const appReducer = (state = initialState, action: ActionsT): InitialStateT => {

    switch (action.type) {
        case reducerActions.AUTH: {
            return {
                ...state,
                isAuth: action.status
            }
        }
        default:
            return state;
    }

}

// * AC
const isAuth = (status: boolean) => {
    return {
        type: reducerActions.AUTH,
        status
    }
}

// * Sagas
export function* appWatcher() {
    yield takeEvery(sagasAppActions.AUTH, authWorker)
}

export function* authWorker() {
    try {
        const res: AxiosResponse<AuthRespT> = yield call(authApi.me);
        yield put(isAuth(true));
        yield put(setIsLoggedIn(true));
    } catch (err) {
        console.log(err.message)
        yield put(isAuth(false));
    }

}

export const authSA = () => ({type: sagasAppActions.AUTH})

