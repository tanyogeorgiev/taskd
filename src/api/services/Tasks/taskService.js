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
export function search(payload) {
    return axiosInstance().get(`/tasks?q=${payload}`);
}
export async function toggleReminder(id) {
    const res = await axiosInstance().get(`tasks/${id}`);
    const updatedTask = { ...res.data, reminder: !res.data.reminder };

    return axiosInstance().patch(`/tasks/${id}`, updatedTask);
}
export function update(payload) {
    return axiosInstance().patch(`/tasks/${payload.id}`, payload);
}
