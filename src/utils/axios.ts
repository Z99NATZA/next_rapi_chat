import axios from "axios";

const api = axios.create({
    // baseURL: 'http://localhost:3030',
    baseURL: 'https://chatbot-version-20250724.fly.dev',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
