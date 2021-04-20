import {InitialStateT, loginReducer, setIsLoggedIn} from "./loginReducer";

let startState: InitialStateT;
beforeEach(() => {
    startState = {
        isLoggedIn: false,
    };
});

test("should changed login status", () => {
    const endState = loginReducer(startState, setIsLoggedIn(true));

    expect(endState.isLoggedIn).toBeTruthy();
});