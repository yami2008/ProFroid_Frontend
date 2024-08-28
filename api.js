import axios from "axios";

const isServer = typeof window == "undefined";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Authorization: !isServer && localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem("token")}`
            : null,
    }
});

export default api;