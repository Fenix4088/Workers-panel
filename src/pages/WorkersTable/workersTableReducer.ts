// * Types

import {call, put, takeEvery} from "redux-saga/effects";
import {AddWorkerRespT, DeleteWorkerRespT, workersApi} from "../../api/api";
import {AxiosResponse} from "axios";

export type NewWorkerT = {
    // _id?: string,
    // updated?: string
    fullName: string,
    gender: "male" | "female",
    contacts: string,
    salary: string,
    position: string,
}

export type WorkersT = NewWorkerT & {
    _id: string,
    updated: string
    // fullName: string,
    // gender: "male" | "female",
    // contacts: string,
    // salary: string,
    // position: string,
}




type ActionsT = ReturnType<typeof setWorkers> | ReturnType<typeof deleteWorker> | ReturnType<typeof addWorker>;

type InitialStateT = {
    workers: Array<WorkersT>
}

// * Actions
const sagasWorkersActions = {
    GET_WORKERS: "SAGA/WORKERS/GET_WORKERS" as const,
    DELETE_WORKER: "SAGA/WORKERS/DELETE_WORKER" as const,
    ADD_WORKER: "SAGA/WORKERS/ADD_WORKER" as const,
}
const reducerActions = {
    SET_WORKERS: "workersTableReducer/SET_WORKERS" as const,
    DELETE_WORKER: "workersTableReducer/DELETE_WORKER" as const,
    ADD_WORKER: "workersTableReducer/ADD_WORKER" as const,
}


// * reducer
const initialState: InitialStateT = {
    workers: [] as Array<WorkersT>,
}

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const {SET_WORKERS, DELETE_WORKER, ADD_WORKER} = reducerActions;
    switch (action.type) {
        case SET_WORKERS: {
            return {
                ...state,
                workers: action.payload
            }
        }
        case ADD_WORKER: {
            return {
                ...state,
                workers: [...state.workers, {...action.workerData, _id: "", updated: ""}]
            }
        }
        case DELETE_WORKER: {
            return {
                ...state,
                workers: state.workers.filter(w => w._id !== action.id)
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

const addWorker = (workerData: NewWorkerT) => {
    return {
        type: reducerActions.ADD_WORKER,
        workerData
    } as const
}

const deleteWorker = (id: string) => {
    return {
        type: reducerActions.DELETE_WORKER,
        id
    } as const
}

// * Sagas
export function* workersWatcher() {
    yield takeEvery(sagasWorkersActions.GET_WORKERS, getWorkersWorker);
    yield takeEvery(sagasWorkersActions.DELETE_WORKER, deleteWorkerWorker);
    yield takeEvery(sagasWorkersActions.ADD_WORKER, addWorkerWorker);
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

function* deleteWorkerWorker(action: ReturnType<typeof deleteWorkersSA>) {
    try {
        const resp: AxiosResponse<DeleteWorkerRespT> = yield call(workersApi.deleteWorker, action.id);
        yield put(deleteWorker(action.id));
        console.log(resp.data.message)
    } catch(err) {
        console.log(err.message)
    }
}

export const deleteWorkersSA = (id: string) => {
    return {
        type: sagasWorkersActions.DELETE_WORKER,
        id
    } as const;
}

function* addWorkerWorker(action: ReturnType<typeof addWorkersSA>) {
    try {
        const resp: AxiosResponse<AddWorkerRespT> = yield call(workersApi.addWorker, action.payload);
        yield put(addWorker(action.payload));
        console.log(resp.data.message)
    } catch(err) {
        console.log(err.message)
    }
}

export const addWorkersSA = (payload: NewWorkerT) => {
    return {
        type: sagasWorkersActions.ADD_WORKER,
        payload

    } as const;
}
