import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: { 'API-KEY': 'b052921e-1dc5-467b-8d3f-84cf447f49ce' }
    }
);

export const usersAPI = {
    getUsers(currentPage: number, countOnPage: number) {
        return instance.get(`users?page=${currentPage}&count=${countOnPage}`)
            .then(response => response.data);
    },

    follow(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    }
};


export const profileAPI = {
    setProfile(id: number) {
        return instance.get(`profile/${id}`);
    },

    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status });
    }

};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type authResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type loginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type logoutResponseType = {
    resultCode: ResultCodesEnum
}


export const authAPI = {
    isAuth() {
        return instance.get<authResponseType>('auth/me')
            .then(response => response.data)
    },

    setLogin(email: string, password: string, rememberMe = false) {
        return instance.post<loginResponseType>(`auth/login`, {email, password, rememberMe});
    },

    makeLogout() {
        return instance.delete<logoutResponseType>('auth/login');
    }

};