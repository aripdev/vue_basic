import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getAllUser(page = 1, limit = 2) {
        return apiClient.get(`users?_page=${page}&_limit=${limit}`)
    },
    getUsers(query) {
        return apiClient.get(`users?${query}`);
    },
    addingUser(data) {
        return apiClient.post('users', data)
    },
    deleteUser(id) {
        return apiClient.delete(`users/${id}`)
    },
    updateUser(data) {
        return apiClient.patch(`users/${data.id}`, data)
    }
}