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
    async getUsers(query) {
        NProgress.start();
        return await apiClient.get(`users?${query}`);
    },
    async addingUser(data) {
        NProgress.start();
        return await apiClient.post('users', data)
    },
    async deleteUser(id) {
        NProgress.start();
        return await apiClient.delete(`users/${id}`)
    },
    async updateUser(data) {
        NProgress.start();
        return await apiClient.patch(`users/${data.id}`, data)
    },
    done() {
        NProgress.done();
    }
}