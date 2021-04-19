import axios, { AxiosResponse } from "axios";
import { NewWorkerT, WorkersT } from "../pages/WorkersTable/workersTableReducer";

const instance = axios.create({
    baseURL: "https://workers-panel.herokuapp.com/",
    withCredentials: true
});

export type RegistrationDataT = {
    email: string;
    password: string;
};

export type LoginDataT = RegistrationDataT & {
    rememberMe: boolean;
};



export type LoginRespT = {
    data: {
        email: string;
        id: string;
        rememberMe: boolean;
    };
};

export type AuthRespT = {
    data: {
        email: string;
        _id: string;
    };
};



export type GetWorkersRespT = {
    count: number;
    workers: Array<WorkersT>;
};

export type MessageRespT = {
    resultCode: number;
    message: string;
};


export const authApi = {
    async me() {
        return await instance.post<AxiosResponse<AuthRespT>>("auth/me");
    },

    async registration(data: RegistrationDataT) {
        return await instance.post<AxiosResponse<MessageRespT>>("auth/register", data);
    },

    async login(data: LoginDataT) {
        return await instance.post<AxiosResponse<LoginRespT>>("auth/login", data);
    },

    async logout() {
        return await instance.delete<AxiosResponse<MessageRespT>>("auth/logout");
    }
};

export const workersApi = {
    async getWorkers() {
        const res = await instance.get<AxiosResponse<GetWorkersRespT>>("workers");
        return res.data.data.workers;
    },
    async deleteWorker(id: string) {
        return await instance.delete<AxiosResponse<MessageRespT>>(`workers/${id}`);
    },
    async addWorker(data: NewWorkerT) {
        return await instance.post<AxiosResponse<MessageRespT>>(`workers`, data);
    },

    async updateWorker(data: WorkersT) {
        return await instance.put<AxiosResponse<MessageRespT>>(`workers/${data._id}`, data);
    }
};