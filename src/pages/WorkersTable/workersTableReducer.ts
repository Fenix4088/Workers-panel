import { call, put, takeEvery } from "redux-saga/effects";
import { AddWorkerRespT, DeleteWorkerRespT, UdateWorkerRespT, workersApi } from "../../api/api";
import { AxiosResponse } from "axios";
import { v1 } from "uuid";
import Toast from "light-toast";
import { toast } from "../../helpers/helpers";

// * Types

export type NewWorkerT = {
    fullName: string;
    gender: "male" | "female";
    contacts: string;
    salary: string;
    position: string;
};

export type WorkersT = NewWorkerT & {
    _id?: string;
    updated?: string;
};

type ActionsT =
    | ReturnType<typeof setWorkers>
    | ReturnType<typeof deleteWorker>
    | ReturnType<typeof addWorker>
    | ReturnType<typeof updateWorker>
    | ReturnType<typeof setFilteredWorkers>;

type InitialStateT = {
    workers: Array<WorkersT>;
};

// * Actions
const sagasWorkersActions = {
    GET_WORKERS: "SAGA/WORKERS/GET_WORKERS" as const,
    DELETE_WORKER: "SAGA/WORKERS/DELETE_WORKER" as const,
    ADD_WORKER: "SAGA/WORKERS/ADD_WORKER" as const,
    UPDATE_WORKER: "SAGA/WORKERS/UPDATE_WORKER" as const
};
const reducerActions = {
    SET_WORKERS: "workersTableReducer/SET_WORKERS" as const,
    DELETE_WORKER: "workersTableReducer/DELETE_WORKER" as const,
    ADD_WORKER: "workersTableReducer/ADD_WORKER" as const,
    UPDATE_WORKER: "workersTableReducer/UPDATE_WORKER" as const,
    SET_FILTERED_WORKERS: "workersTableReducer/SET_FILTERED_WORKERS" as const
};

// * reducer
const initialState: InitialStateT = {
    workers: [] as Array<WorkersT>
};

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const { SET_WORKERS, DELETE_WORKER, ADD_WORKER, UPDATE_WORKER, SET_FILTERED_WORKERS } = reducerActions;
    switch (action.type) {
        case SET_WORKERS: {
            return {
                ...state,
                workers: action.payload
            };
        }
        case SET_FILTERED_WORKERS: {
            return {
                ...state,
                workers: [...action.workerData]
            };
        }
        case ADD_WORKER: {
            return {
                ...state,
                workers: [...state.workers, { ...action.workerData }]
            };
        }
        case DELETE_WORKER: {
            return {
                ...state,
                workers: state.workers.filter((w) => w._id !== action.id)
            };
        }

        case UPDATE_WORKER: {
            return {
                ...state,
                workers: state.workers.map((w) =>
                    w._id === action.workerData._id ? { ...w, ...action.workerData } : w
                )
            };
        }
        default:
            return state;
    }
};

// * AC

const setWorkers = (payload: Array<WorkersT>) => {
    return {
        type: reducerActions.SET_WORKERS,
        payload
    } as const;
};

const addWorker = (workerData: NewWorkerT) => {
    return {
        type: reducerActions.ADD_WORKER,
        id: v1(),
        workerData
    } as const;
};

const deleteWorker = (id: string) => {
    return {
        type: reducerActions.DELETE_WORKER,
        id
    } as const;
};

export const updateWorker = (workerData: WorkersT) => {
    return {
        type: reducerActions.UPDATE_WORKER,
        workerData
    } as const;
};

export const setFilteredWorkers = (workerData: Array<WorkersT>) => {
    return {
        type: reducerActions.SET_FILTERED_WORKERS,
        workerData
    } as const;
};

// * Sagas
export function* workersWatcher() {
    yield takeEvery(sagasWorkersActions.GET_WORKERS, getWorkersWorker);
    yield takeEvery(sagasWorkersActions.DELETE_WORKER, deleteWorkerWorker);
    yield takeEvery(sagasWorkersActions.ADD_WORKER, addWorkerWorker);
    yield takeEvery(sagasWorkersActions.UPDATE_WORKER, updateWorkerWorker);
}

function* getWorkersWorker() {
    try {
        const workers: Array<WorkersT> = yield call(workersApi.getWorkers);
        yield put(setWorkers(workers));
    } catch (err) {
        yield call(toast, "fail", err.message);
    }
}

export const getWorkersSA = () => {
    return {
        type: sagasWorkersActions.GET_WORKERS
    } as const;
};

function* deleteWorkerWorker(action: ReturnType<typeof deleteWorkersSA>) {
    try {
        const resp: AxiosResponse<DeleteWorkerRespT> = yield call(workersApi.deleteWorker, action.id);
        yield put(deleteWorker(action.id));
        yield call(toast, "success", resp.data.message);
    } catch (err) {
        yield call(toast, "fail", err.message);
    }
}

export const deleteWorkersSA = (id: string) => {
    return {
        type: sagasWorkersActions.DELETE_WORKER,
        id
    } as const;
};

function* addWorkerWorker(action: ReturnType<typeof addWorkersSA>) {
    try {
        const resp: AxiosResponse<AddWorkerRespT> = yield call(workersApi.addWorker, action.payload);
        yield put(addWorker(action.payload));
        yield put(getWorkersSA());
        yield call(toast, "success", resp.data.message);
    } catch (err) {
        yield call(toast, "fail", err.response.data.message);
    }
}

export const addWorkersSA = (payload: NewWorkerT) => {
    return {
        type: sagasWorkersActions.ADD_WORKER,
        payload
    } as const;
};

function* updateWorkerWorker(action: ReturnType<typeof updateWorkerSA>) {
    try {
        const resp: AxiosResponse<UdateWorkerRespT> = yield call(workersApi.updateWorker, action.payload);
        yield put(updateWorker(action.payload));
        yield call(toast, "success", resp.data.message);
    } catch (err) {
        yield call(toast, "fail", err.message);
    }
}

export const updateWorkerSA = (payload: WorkersT) => {
    return {
        type: sagasWorkersActions.UPDATE_WORKER,
        payload
    } as const;
};
