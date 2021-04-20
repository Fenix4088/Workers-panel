import {
    addWorker,
    deleteWorker,
    InitialStateT,
    NewWorkerT,
    setWorkers,
    tableLoading,
    updateWorker,
    workerLoading,
    WorkersT,
    workersTableReducer
} from "./workersTableReducer";

let startState: InitialStateT;
beforeEach(() => {
    startState = {
        workers: [
            {
                _id: "607af5ec74250300043ae461",
                fullName: "Andrej Yefimov",
                gender: "male",
                contacts: "79321233",
                salary: "700",
                position: "senior",
                updated: "2021-04-20T06:42:20.578Z",
                isLoading: false
            },
            {
                _id: "607af5ec74250300043ae777",
                fullName: "Billy Milligan",
                gender: "male",
                contacts: "785233321",
                salary: "800",
                position: "junior",
                updated: "2021-04-20T06:42:20.578Z",
                isLoading: false
            },
            {
                _id: "777af5ec74250300043ae461",
                fullName: "Anna Korenina",
                gender: "female",
                contacts: "765744987",
                salary: "1800",
                position: "middle",
                updated: "2021-04-20T06:42:20.578Z",
                isLoading: false
            }
        ],
        isTableLoading: false
    };
});

test("should change table status while loading", () => {
    const endState = workersTableReducer(startState, tableLoading(true));

    expect(endState.isTableLoading).toBeTruthy();
    expect(startState.isTableLoading).toBeFalsy();
});

test("should change table data status while loading", () => {
    const endState = workersTableReducer(startState, workerLoading(true, "777af5ec74250300043ae461"));

    expect(endState.workers.every((w) => !w.isLoading)).toBeFalsy();
    expect(endState.workers[2].isLoading).toBeTruthy();
});

test("should set workers to empty state", () => {
    const startState: InitialStateT = {
        workers: [],
        isTableLoading: false
    };

    const settedWorkers: Array<WorkersT> = [
        {
            _id: "607af5ec74250300043ae461",
            fullName: "Andrej Yefimov",
            gender: "male",
            contacts: "79321233",
            salary: "700",
            position: "senior",
            updated: "2021-04-20T06:42:20.578Z",
            isLoading: false
        },
        {
            _id: "607af5ec74250300043ae777",
            fullName: "Billy Milligan",
            gender: "male",
            contacts: "785233321",
            salary: "800",
            position: "junior",
            updated: "2021-04-20T06:42:20.578Z",
            isLoading: false
        },
        {
            _id: "777af5ec74250300043ae461",
            fullName: "Anna Korenina",
            gender: "female",
            contacts: "765744987",
            salary: "1800",
            position: "middle",
            updated: "2021-04-20T06:42:20.578Z",
            isLoading: false
        }
    ];

    const endState = workersTableReducer(startState, setWorkers(settedWorkers));

    expect(startState.workers.length === 0).toBeTruthy();
    expect(endState.workers.length === 3).toBeTruthy();
    expect(endState.workers.every((w) => "_id" in w)).toBeTruthy();
});

test("should add worker correctly", () => {
    const newWorker: NewWorkerT = {
        fullName: "Kristina Beliaeva",
        gender: "female",
        contacts: "23343355",
        salary: "7100",
        position: "seniorita"
    };

    const endState = workersTableReducer(startState, addWorker(newWorker));

    expect(startState.workers.length === 3).toBeTruthy();
    expect(endState.workers.length === 4).toBeTruthy();
    expect(endState.workers[3].fullName === newWorker.fullName).toBeTruthy();
});

test("should delete worker correctly", () => {
    const endState = workersTableReducer(startState, deleteWorker("607af5ec74250300043ae461"));

    expect(startState.workers.length === 3).toBeTruthy();
    expect(endState.workers.length === 2).toBeTruthy();
    expect(endState.workers.every((w) => w._id !== "607af5ec74250300043ae461")).toBeTruthy();
});

test("should update worker correctly", () => {
    const newWorkerData: WorkersT = {
        _id: "607af5ec74250300043ae461",
        fullName: "Andrej Kostomacha",
        gender: "male",
        contacts: "79321233",
        salary: "2700",
        position: "senior",
        updated: "2021-04-20T06:42:20.578Z",
        isLoading: false
    };

    const endState = workersTableReducer(startState, updateWorker(newWorkerData));

    expect(startState.workers.length === 3).toBeTruthy();
    expect(endState.workers.length === 3).toBeTruthy();
    expect(startState.workers[0].fullName).toBe("Andrej Yefimov");
    expect(endState.workers[0].fullName).toBe("Andrej Kostomacha");
    expect(startState.workers[0].salary).toBe("700");
    expect(endState.workers[0].salary).toBe("2700");
});
