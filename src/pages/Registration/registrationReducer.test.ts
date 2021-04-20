import {InitialStateT, isRegistered, registrationReducer} from "./registrationReducer";

let startState: InitialStateT;
beforeEach(() => {
    startState = {
        isRegistered: false,
    };
});

test("should changed registered status", () => {
    const endState = registrationReducer(startState, isRegistered(true));

    expect(endState.isRegistered).toBeTruthy();
});