import * as axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: { 'API-KEY': '029d1c64-0277-40a0-b338-bc76311811a0' }
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
    },

    setProfile(id) {
      return instance.get(`profile/${id}`)
          .then(response => response.data);
    }
};

export const authAPI = {
    isAuth() {
        return instance.get('auth/me')
            .then(response => response.data)
    }
};