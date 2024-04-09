import http from "../http-common";

class RolServicios {
    getAll() {
        return http.get("/roles");
    }

    get(id) {
        return http.get(`/rol/${id}`);
    }

    create(data) {
        return http.post("/rol", data);
    }

    update(id, data) {
        return http.put(`/rol/${id}`, data);
    }

    delete(id) {
        return http.delete(`/rol/${id}`);
    }

    deleteAll() {
        return http.delete(`/rolesDeleteAll`);
    }

}

export default new RolServicios();