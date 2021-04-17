import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://workers-panel.herokuapp.com/',
    withCredentials: true
})

export type RegistrationDataT = {
    email: string,
    password: string
}

export type LoginDataT = RegistrationDataT & {
    rememberMe: boolean
}

export type LogoutRespT = {
    resultCode: number,
    message: string
}

export type LoginRespT = {
    data: {
        email: string
        id: string
        rememberMe: boolean
    }
}

export type AuthRespT = {
    data: {
        email: string
        _id: string
    }
}



export const authApi = {
    async me() {
        return await instance.post<AxiosResponse<AuthRespT>>("auth/me");
    },

    async registration(data: RegistrationDataT) {
        return await instance.post("auth/register", data);
    },

    async login(data: LoginDataT) {
        return await instance.post<AxiosResponse<LoginRespT>>("auth/login", data);
    },

    async logout() {
        return await instance.delete<AxiosResponse<LogoutRespT>>("auth/logout");
    }
};

export const workersApi = {};