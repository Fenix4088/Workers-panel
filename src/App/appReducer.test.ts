import {
    appLoading,
    appReducer,
    AuthUserDataT,
    changeModalStatus,
    InitialStateT,
    isAuth,
    ModalStatusT,
    setUserData
} from "./appReducer";
import { WorkersT } from "../pages/WorkersTable/workersTableReducer";

let startState: InitialStateT;
beforeEach(() => {
    startState = {
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
        }
    };
});

test("should change user status auth/not Auth", () => {
    let endState = appReducer(startState, isAuth(true));

    expect(endState.isAuth).toBeTruthy();
});

test("should change app loading status", () => {
    let endState = appReducer(startState, appLoading(true));

    expect(endState.isAppLoading).toBeTruthy();
});

test("should change modal status", () => {
    const optionalData: WorkersT = {
        fullName: "Alexsander Pushkin",
        gender: "male",
        contacts: "729233897",
        salary: "200",
        position: "frontend",
        isLoading: false
    };

    let endState = appReducer(startState, changeModalStatus({ modalType: "update", isVisible: true, optionalData }));

    expect(endState.modalStatus.isVisible).toBeTruthy();
    expect(endState.modalStatus.modalType).toBe("update");
    expect(Object.values(endState.modalStatus.optionalData).length > 0).toBeTruthy();
});

test("should set user data", () => {
    const userData: AuthUserDataT = {
        email: "test@email.com",
        id: "23231221"
    };

    let endState = appReducer(startState, setUserData(userData));

    expect(endState.authUserData.id).toBe("23231221");
    expect(endState.authUserData.email).toBe("test@email.com");
});
