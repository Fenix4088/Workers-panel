// * Types

import {call, put, takeEvery} from "redux-saga/effects";
import {GetWorkersRespT, workersApi} from "../../api/api";
import {AxiosResponse} from "axios";

export type WorkersT = {
    _id: string,
    fullName: string,
    gender: "male" | "female",
    contacts: string,
    salary: string,
    position: string,
    createdAt: string,
    updatedAt: string
}

type ActionsT = ReturnType<typeof setWorkers>;

type InitialStateT = {
    workers: Array<WorkersT>
}

// * Actions
const sagasWorkersActions = {
    GET_WORKERS: "SAGA/WORKERS/GET_WORKERS" as const,
}
const reducerActions = {
    SET_WORKERS: "workersTableReducer/SET_WORKERS" as const,
}


// * reducer
const initialState: InitialStateT = {
    workers: [] as Array<WorkersT>,
}

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const {SET_WORKERS} = reducerActions;
    switch (action.type) {
        case SET_WORKERS: {
            return {
                ...state,
                workers: action.payload
            }
        }
        default:
            return state;
    }
}

// * AC

const setWorkers = (payload: Array<WorkersT>) => {
    return {
        type: reducerActions.SET_WORKERS,
        payload
    } as const
}

// * Sagas
export function* workersWatcher() {
    yield takeEvery(sagasWorkersActions.GET_WORKERS, getWorkersWorker)
}

function* getWorkersWorker() {
    try {
        const workers: Array<WorkersT> = yield call(workersApi.getWorkers);
        yield put(setWorkers(workers));
    } catch(err) {
        console.log(err.message)
    }
}

export const getWorkersSA = () => {
    return {
        type: sagasWorkersActions.GET_WORKERS,
    } as const;
}
