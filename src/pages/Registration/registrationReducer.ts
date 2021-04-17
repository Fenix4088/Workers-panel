// * Types
import {call, put, takeEvery} from "redux-saga/effects";
import {authApi, RegisterRespT, RegistrationDataT} from "../../api/api";
import {AxiosResponse} from "axios";

type ActionsT = ReturnType<typeof isRegistered>;

type InitialStateT = {
    isRegistered: boolean
}


//* Actions
const reducerActions = {
    REGISTERED_STATUS: "registrationReducer/REGISTERED_STATUS" as const
}

const sagasRegistrationActions = {
    REGISTRATION: "SAGA/REGISTRATION/REGISTRATION"
}

// * reducer
const initialState: InitialStateT = {
    isRegistered: false
}

export const registrationReducer = (state = initialState, action: ActionsT): InitialStateT => {
    switch (action.type) {
        case reducerActions.REGISTERED_STATUS: {
            return {
                ...state, isRegistered: action.status
            }
        }
        default:
            return state;
    }

}


// * AC
const isRegistered = (status: boolean) => {
    return {
        type: reducerActions.REGISTERED_STATUS,
        status
    }
}

// * saga
export function* registrationWatcher() {
    yield takeEvery(sagasRegistrationActions.REGISTRATION, registrationWorker)
}

function* registrationWorker(action: ReturnType<typeof registrationSA>) {
    try {
        const res: AxiosResponse<RegisterRespT> = yield call(authApi.registration, action.payload);
        console.log(res.data.message)
        yield put(isRegistered(true));
    } catch(err) {
        console.log(err.message)
        yield put(isRegistered(false));
    }
}

export const registrationSA = (payload: RegistrationDataT) => {
    return {
        type: sagasRegistrationActions.REGISTRATION,
        payload
    } as const;

}