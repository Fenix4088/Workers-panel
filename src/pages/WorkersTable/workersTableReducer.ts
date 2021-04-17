// * Types

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

type ActionsT = any;

type InitialStateT = {
    workers: Array<WorkersT>
}


// * reducer
const initialState: InitialStateT = {
    workers: [] as Array<WorkersT>,
}

export const workersTableReducer = (state = initialState, action: ActionsT): InitialStateT => {
    switch (action.type) {
        default:
            return state;
    }


}