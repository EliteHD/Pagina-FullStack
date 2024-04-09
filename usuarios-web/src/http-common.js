import axios from 'axios';

// Suponiendo que guardas el token en localStorage cuando el usuario se loguea
const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete axios.defaults.headers.common['Authorization'];
}

export default axios.create({
    baseURL: "http://localhost:9595/api",
    headers: {
        "Content-type": "application/json"
    }
});
