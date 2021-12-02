import axiosInstance from '../../axios';

export function add(payload) {
    return axiosInstance(payload).post('/tasks', payload);
}
export function remove(payload) {
    return axiosInstance().delete(`/tasks/${payload}`);
}
export function get(payload) {
    return axiosInstance().get(`/tasks?userId=${payload}`);
}
export function search(payload, userId) {
    // return axiosInstance().get(`/tasks?q=${payload}`);
    return axiosInstance().get(`/tasks?text_like=${payload}&userId=${userId}`);
}
export async function toggleReminder(id) {
    const res = await axiosInstance().get(`tasks/${id}`);
    const updatedTask = { ...res.data, reminder: !res.data.reminder };

    return axiosInstance().patch(`/tasks/${id}`, updatedTask);
}
export function update(payload) {
    return axiosInstance().patch(`/tasks/${payload.id}`, payload);
}
