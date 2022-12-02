import axios from 'axios';
import NProgress from 'nprogress';
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getUsers(query) {
        NProgress.start();
        return apiClient.get(`users?${query}`);
    },
    addingUser(data) {
        NProgress.start();
        return apiClient.post('users', data)
    },
    deleteUser(id) {
        NProgress.start();
        return apiClient.delete(`users/${id}`)
    },
    updateUser(data) {
        NProgress.start();
        return apiClient.patch(`users/${data.id}`, data)
    },
    done() {
        NProgress.done();
    }
}