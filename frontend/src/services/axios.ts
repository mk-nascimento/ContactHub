import axios from 'axios';

export default axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: import.meta.env.VITE_TIMEOUT || 5000 });
