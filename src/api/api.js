import * as axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: { 'API-KEY': 'b052921e-1dc5-467b-8d3f-84cf447f49ce' }
    }
);

export const usersAPI = {
    getUsers(currentPage, countOnPage) {
        return instance.get(`users?page=${currentPage}&count=${countOnPage}`)
            .then(response => response.data);
    },

    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    },

    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    }
};

export const profileAPI = {
    setProfile(id) {
        return instance.get(`profile/${id}`);
    },

    getStatus(id) {
        return instance.get(`profile/status/${id}`);
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    }

};

export const authAPI = {
    isAuth() {
        return instance.get('auth/me')
            .then(response => response.data)
    },

    setLogin(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },

    makeLogout() {
        return instance.delete('auth/login');
    }

};