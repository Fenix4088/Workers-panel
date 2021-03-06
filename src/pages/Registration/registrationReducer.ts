// * Types
import { call, put, takeEvery } from "redux-saga/effects";
import { authApi, MessageRespT, RegistrationDataT } from "../../api/api";
import { AxiosResponse } from "axios";
import { toast } from "../../helpers/helpers";

type ActionsT = ReturnType<typeof isRegistered> | ReturnType<typeof isPending>;

export type InitialStateT = {
    isRegistered: boolean;
    isPending: boolean;
};

//* Actions
const reducerActions = {
    REGISTERED_STATUS: "registrationReducer/REGISTERED_STATUS" as const,
    PENDING: "registrationReducer/PENDING" as const
};

const sagasRegistrationActions = {
    REGISTRATION: "SAGA/REGISTRATION/REGISTRATION"
};

// * reducer
const initialState: InitialStateT = {
    isRegistered: false,
    isPending: false
};

export const registrationReducer = (state = initialState, action: ActionsT): InitialStateT => {
    switch (action.type) {
        case reducerActions.REGISTERED_STATUS: {
            return {
                ...state,
                isRegistered: action.status
            };
        }
        case reducerActions.PENDING: {
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
export const isRegistered = (status: boolean) => {
    return {
        type: reducerActions.REGISTERED_STATUS,
        status
    };
};

export const isPending = (status: boolean) => {
    return {
        type: reducerActions.PENDING,
        status
    };
};

// * saga
export function* registrationWatcher() {
    yield takeEvery(sagasRegistrationActions.REGISTRATION, registrationWorker);
}

function* registrationWorker(action: ReturnType<typeof registrationSA>) {
    yield put(isPending(true));
    try {
        const res: AxiosResponse<MessageRespT> = yield call(authApi.registration, action.payload);
        yield call(toast, "success", res.data.message);
        yield put(isRegistered(true));
        yield put(isPending(false));
    } catch (err) {
        yield call(toast, "fail", err.message);
        yield put(isPending(false));

        yield put(isRegistered(false));
    }
}

export const registrationSA = (payload: RegistrationDataT) => {
    return {
        type: sagasRegistrationActions.REGISTRATION,
        payload
    } as const;
};
