// AUTH SERVICE CRUD TO POSTGRESQL 
import http from "../http-common";

class AuthServicios {
    login(data) {
        return http.post("/login", data);
    }

    register(data) {
        return http.post("/register", data);
    }

    logout() {
        return http.get("/logout");
    }

    getCurrentUser() {
        return http.get("/user");
    }
}

export default new AuthServicios();

