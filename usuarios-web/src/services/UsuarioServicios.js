import http from "../http-common";

class UsuarioServicios {
    getAll() {
        return http.get("/usuarios");
    }

    get(id) {
        return http.get(`/usuarios/${id}`);
    }

    create(data) {
        return http.post("/usuario", data);
    }

    update(id, data) {
        return http.put(`/usuarios/${id}`, data);
    }

    delete(id) {
        return http.delete(`/usuarios/${id}`);
    }

    deleteAll() {
        return http.delete(`/usuariosDeleteAll`);
    }

}

export default new UsuarioServicios();
