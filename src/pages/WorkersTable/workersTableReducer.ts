import { call, put, takeEvery } from "redux-saga/effects";
import { MessageRespT, workersApi } from "../../api/api";
import { AxiosResponse } from "axios";
import { v1 } from "uuid";
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
    isLoading: boolean;
};

type ActionsT =
    | ReturnType<typeof setWorkers>
    | ReturnType<typeof deleteWorker>
    | ReturnType<typeof addWorker>
    | ReturnType<typeof updateWorker>
    | ReturnType<typeof setFilteredWorkers>
    | ReturnType<typeof tableLoading>
    | ReturnType<typeof workerLoading>;

type InitialStateT = {
    workers: Array<WorkersT>;
    isTableLoading: boolean;
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
    SET_FILTERED_WORKERS: "workersTableReducer/SET_FILTERED_WORKERS" as const,
    TABLE_LOADING: "workersTableReducer/TABLE_LOADING" as const,
    WORKER_LOADING: "workersTableReducer/WORKER_LOADING" as const
};

// * reducer
const initialState: InitialStateT = {
    workers: [] as Array<WorkersT>,
    isTableLoading: false
};

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const {
        SET_WORKERS,
        DELETE_WORKER,
        ADD_WORKER,
        UPDATE_WORKER,
        SET_FILTERED_WORKERS,
        TABLE_LOADING,
        WORKER_LOADING
    } = reducerActions;
    switch (action.type) {
        case SET_WORKERS: {
            return {
                ...state,
                workers: action.payload.map((w) => ({ ...w, isLoading: false }))
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
                workers: [...state.workers, { ...action.workerData, isLoading: false }]
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
        case TABLE_LOADING: {
            return {
                ...state,
                isTableLoading: action.status
            };
        }
        case WORKER_LOADING: {
            return {
                ...state,
                workers: state.workers.map((w) => (w._id === action.workerId ? { ...w, isLoading: action.status } : w))
            };
        }
        default:
            return state;
    }
};

// * AC

export const tableLoading = (status: boolean) => {
    return {
        type: reducerActions.TABLE_LOADING,
        status
    } as const;
};

export const workerLoading = (status: boolean, workerId: string) => {
    return {
        type: reducerActions.WORKER_LOADING,
        status,
        workerId
    } as const;
};

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
    debugger;
    yield put(tableLoading(true));
    try {
        const workers: Array<WorkersT> = yield call(workersApi.getWorkers);
        yield put(setWorkers(workers));
        yield put(tableLoading(false));
    } catch (err) {
        yield call(toast, "fail", err.message);
        yield put(tableLoading(false));
    }
}

export const getWorkersSA = () => {
    return {
        type: sagasWorkersActions.GET_WORKERS
    } as const;
};

function* deleteWorkerWorker(action: ReturnType<typeof deleteWorkersSA>) {
    try {
        yield put(workerLoading(true, action.id));
        const resp: AxiosResponse<MessageRespT> = yield call(workersApi.deleteWorker, action.id);
        yield put(deleteWorker(action.id));
        yield call(toast, "success", resp.data.message);
    } catch (err) {
        yield put(workerLoading(false, action.id));
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
        const resp: AxiosResponse<MessageRespT> = yield call(workersApi.addWorker, action.payload);
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
        if(action.payload._id) yield put(workerLoading(true, action.payload._id));
        const resp: AxiosResponse<MessageRespT> = yield call(workersApi.updateWorker, action.payload);
        yield put(updateWorker(action.payload));
        yield call(toast, "success", resp.data.message);
    } catch (err) {
        if(action.payload._id) yield put(workerLoading(false, action.payload._id));
        yield call(toast, "fail", err.message);
    }
}

export const updateWorkerSA = (payload: WorkersT) => {
    return {
        type: sagasWorkersActions.UPDATE_WORKER,
        payload
    } as const;
};
