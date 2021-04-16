// * Types
type ActionsT = any;

type InitialStateT = {}

const initialState: InitialStateT = {}

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    switch (action.type) {
        default:
            return state;
    }


}