// * Types
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {authApi, AuthRespT} from "../api/api";
import {setIsLoggedIn} from "../pages/Login/loginReducer";
import {WorkersT} from "../pages/WorkersTable/workersTableReducer";
import {toast} from "../helpers/helpers";

type ActionsT =
    ReturnType<typeof isAuth>
    | ReturnType<typeof changeModalStatus>
    | ReturnType<typeof appLoading>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setPageData>| ReturnType<typeof setCurrentUsersIndexes>;

export type ModalStatusT = {
    modalType?: "add" | "update";
    optionalData: WorkersT;
    isVisible: boolean;
};

export type AuthUserDataT = {
    email: string,
    id: string
};

export type PaginatorDataT = {
    totalPageCount: Array<number>,
    usersPerPage: number,
    currentUsersIndexes: Array<number>
}

export type InitialStateT = {
    isAuth: boolean;
    isAppLoading: boolean;
    modalStatus: ModalStatusT;
    authUserData: AuthUserDataT;
    paginatorData: PaginatorDataT;
};

// * Actions
const sagasAppActions = {
    AUTH: "SAGA/APP/AUTH"
};

const reducerActions = {
    AUTH: "appReducer/AUTH" as const,
    MODAL_STATUS: "appReducer/MODAL_STATUS" as const,
    APP_LOADING: "appReducer/APP_LOADING" as const,
    SET_USER_DATA: "appReducer/SET_USER_DATA" as const,
    SET_TOTAL_PAGE_COUNT: "appReducer/SET_TOTAL_PAGE_COUNT" as const,
    SET_CURRENT_USER_INDEXES: "appReducer/SET_CURRENT_USER_INDEXES" as const,
};

// * Reducer
const initialState: InitialStateT = {
    isAuth: false,
    isAppLoading: false,
    authUserData: {
        email: "",
        id: ""
    },
    modalStatus: {
        modalType: "add",
        isVisible: false,
        optionalData: {} as WorkersT
    },
    paginatorData: {
        totalPageCount: [0],
        usersPerPage: 0,
        currentUsersIndexes: [0]
    }
};

export const appReducer = (state = initialState, action: ActionsT): InitialStateT => {
    const {AUTH, MODAL_STATUS, APP_LOADING, SET_USER_DATA, SET_TOTAL_PAGE_COUNT, SET_CURRENT_USER_INDEXES} = reducerActions;

    switch (action.type) {
        case AUTH: {
            return {
                ...state,
                isAuth: action.status
            };
        }
        case MODAL_STATUS: {
            const {isVisible, modalType, optionalData} = action.modalStatus;
            return {
                ...state,
                modalStatus: {...state.modalStatus, isVisible, modalType, optionalData: optionalData}
            };
        }
        case APP_LOADING: {
            return {
                ...state,
                isAppLoading: action.status
            };
        }
        case SET_USER_DATA: {
            return {
                ...state,
                authUserData: {...state.authUserData, email: action.userData.email, id: action.userData.id}
            };
        }
        case SET_TOTAL_PAGE_COUNT: {
            return {
                ...state,
                paginatorData: {...state.paginatorData, totalPageCount: action.pagesList, usersPerPage: action.usersPerPage}
            };
        }
        case SET_CURRENT_USER_INDEXES: {
            return {
                ...state,
                paginatorData: {...state.paginatorData, currentUsersIndexes: action.indexes}
            };
        }
        default:
            return state;
    }
};

// * AC

export const setCurrentUsersIndexes = (indexes: Array<number>) => {
    return {
        type: reducerActions.SET_CURRENT_USER_INDEXES,
        indexes
    } as const;
};

export const isAuth = (status: boolean) => {
    return {
        type: reducerActions.AUTH,
        status
    } as const;
};

export const appLoading = (status: boolean) => {
    return {
        type: reducerActions.APP_LOADING,
        status
    } as const;
};

export const changeModalStatus = (modalStatus: ModalStatusT) => {
    return {
        type: reducerActions.MODAL_STATUS,
        modalStatus
    } as const;
};

export const setUserData = (userData: AuthUserDataT) => {
    return {
        type: reducerActions.SET_USER_DATA,
        userData
    } as const;
};

export const setPageData = (pagesList: Array<number>, usersPerPage: number) => {
    return {
        type: reducerActions.SET_TOTAL_PAGE_COUNT,
        pagesList,
        usersPerPage
    } as const;
};


// * Sagas
export function* appWatcher() {
    yield takeEvery(sagasAppActions.AUTH, authWorker);
}

export function* authWorker() {
    yield put(appLoading(true));
    try {
        const res: AxiosResponse<AuthRespT> = yield call(authApi.me);
        const {email, _id} = res.data.data;
        yield put(isAuth(true));
        yield put(setUserData({email, id: _id}));
        yield put(setIsLoggedIn(true));
        yield put(appLoading(false));
        yield call(toast, "success", `Welcome, ${res.data.data.email}`);
    } catch (err) {
        yield call(toast, "info", "Please login or create a new account!");
        yield put(isAuth(false));
        yield put(appLoading(false));
    }
}

export const authSA = () => ({type: sagasAppActions.AUTH});
