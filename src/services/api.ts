import axios from 'axios';

const api = axios.create({
    baseURL: "https://mid-mvp.herokuapp.com",
});

export default api;