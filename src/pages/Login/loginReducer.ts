// * Types
import { call, put, takeEvery } from "redux-saga/effects";
import {authApi, LoginDataT, LoginRespT, MessageRespT} from "../../api/api";
import { AxiosResponse } from "axios";
import { toast } from "../../helpers/helpers";
import {setUserData} from "../../App/appReducer";

type ActionsT = ReturnType<typeof setIsLoggedIn> | ReturnType<typeof setIsPending>;

export type InitialStateT = {
    isLoggedIn: boolean;
    isPending: boolean;
};

// * Actions
const sagasLoginActions = {
    LOGIN: "SAGA/LOGIN/LOGIN",
    LOGOUT: "SAGA/LOGIN/LOGOUT"
};

const reducerActions = {
    LOGIN: "loginReducer/LOGIN_STATUS" as const,
    PENDING: "loginReducer/PENDING" as const
};

// * Reducer
 const initialState: InitialStateT = {
    isLoggedIn: false,
     isPending: false
};

export const loginReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const { LOGIN, PENDING } = reducerActions;

    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: action.status
            };
        }
        case PENDING: {
            return {
                ...state,
                isPending: action.status
            };
        }
        default:
            return state;
    }
};

// * AC
export const setIsLoggedIn = (status: boolean) => {
    return {
        type: reducerActions.LOGIN,
        status
    };
};
export const setIsPending = (status: boolean) => {
    return {
        type: reducerActions.PENDING,
        status
    };
};

// * Sagas
export function* loginWatcher() {
    yield takeEvery(sagasLoginActions.LOGIN, loginWorker);
    yield takeEvery(sagasLoginActions.LOGOUT, logoutWorker);
}

export function* loginWorker(action: ReturnType<typeof loginSA>) {
    yield put(setIsPending(true));
    try {
        const res: AxiosResponse<LoginRespT> = yield call(authApi.login, action.payload);
        const {email, id} = res.data.data;
        yield put(setIsLoggedIn(true));
        yield put(setUserData({email, id}));
        yield put(setIsPending(false));
        yield call(toast, "success", `Nice to see you, ${res.data.data.email}`);
    } catch (err) {
        yield put(setIsLoggedIn(false));
        yield put(setIsPending(false));
        yield call(toast, "fail", err.response.data.message);
    }
}

export const loginSA = (payload: LoginDataT) =>
    ({
        type: sagasLoginActions.LOGIN,
        payload
    } as const);

export function* logoutWorker() {
    try {
        const res: AxiosResponse<MessageRespT> = yield call(authApi.logout);
        yield put(setUserData({email: "", id: ""}));
        yield put(setIsLoggedIn(false));
        yield call(toast, "success", res.data.message);
    } catch (err) {
        yield call(toast, "fail", err.message);
        yield put(setIsLoggedIn(true));
    }
}

export const logoutSA = () =>
    ({
        type: sagasLoginActions.LOGOUT
    } as const);
