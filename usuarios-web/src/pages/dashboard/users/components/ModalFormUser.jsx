
import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import RolServicios from "../../../../services/RolServicios";
import UsuarioServicios from "../../../../services/UsuarioServicios";
import { useAlert } from "../../../../providers/AlertContext";

function ModalFormUser({ isOpen, onClose, userData, onSave  }) {

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState([]);
    const [rolActual, setRolActual] = useState("");

    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        nombre: "",
        apepat: "",
        apemat: "",
        correo: "",
        contrasenia: "",
        telefono: "",
        birthdate: "",
        rol_id: "",
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await RolServicios.getAll();
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
        if (userData) {
            setIsEditing(true);
            setFormData({
                ...userData,
                rol_id: userData.rol?.id || '',
            });
            setRolActual(userData.rol.nombre);

        } else {
            setIsEditing(false);
            resetFormData();
        }
    }, [userData]);

    const resetFormData = () => {
        setFormData({
            nombre: "",
            apepat: "",
            apemat: "",
            correo: "",
            contrasenia: "",
            telefono: "",
            birthdate: "",
            rol_id: "",
        });
    };

    const handleChange = (e) => {
        let name, value;
        if (e.target) {
            ({ name, value } = e.target);
        } else {
            name = "rol_id";
            value = e;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isEditing) {
                response = await UsuarioServicios.update(userData.id, formData);
                showAlert("Usuario actualizado con éxito", "success");
            } else {
                response = await UsuarioServicios.create(formData);
                showAlert("Usuario creado con éxito", "success");
            }
            onSave(response.data); // Llamar a onSave con los datos actualizados
            onClose();
            resetFormData();
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
            let errorMessage = 'Error desconocido al intentar procesar el formulario.';
            if (error.response && error.response.data) {
                errorMessage = error.response.data.msg || error.response.data.message || error.response.data.error || 'Error al procesar la solicitud.';
            }
            showAlert(errorMessage, "error");
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose} className="p-7">
            <DialogHeader className="flex items-start justify-between p-4">
                <div className="flex items-center">
                    {isEditing ? (
                        <UserPlusIcon className="h-10 w-10 mr-3 text-green-500" />
                    ) : (
                        <UserPlusIcon className="h-10 w-10 mr-3 text-green-500" />
                    )}
                    <div>
                        <Typography variant="h6" className="font-bold">
                            {isEditing ? "Editar Usuario" : "Agregar Usuario"}
                        </Typography>
                        <Typography variant="body2" className="mt-1">
                            {isEditing
                                ? "Actualiza los datos del usuario."
                                : "Rellena los datos para registrar un nuevo usuario."}
                        </Typography>
                    </div>
                </div>
                <IconButton color="gray" size="sm" variant="text" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </IconButton>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody className="space-y-4">
                    <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    <div className="flex flex-col md:flex-row gap-4">
                        <Input label="Apellido Paterno" name="apepat" value={formData.apepat} onChange={handleChange} />
                        <Input label="Apellido Materno" name="apemat" value={formData.apemat} onChange={handleChange} />
                    </div>
                    <Input label="Correo" type="email" name="correo" value={formData.correo} onChange={handleChange} />
                    <div className="flex items-center gap-3">
                        <Input label="Contraseña" type={showPassword ? "text" : "password"} name="contrasenia" value={formData.contrasenia} onChange={handleChange} />
                        <Button
                            type="button"
                            size="regular"
                            onClick={() => setShowPassword((prev) => !prev)}
                            color={showPassword ? "teal" : "gray"}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
                        <Input label="Fecha de Nacimiento" type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                    </div>
                    <Select label="Rol" value={formData.rol_id} onChange={handleChange} name="rol_id">
                        {rolActual && (
                            <Option key={formData.rol_id} value={formData.rol_id}>
                                {rolActual}
                            </Option>
                        )}
                        {roles.map((rol) => (
                            <Option key={rol.id} value={rol.id}>
                                {rol.nombre}
                            </Option>
                        ))}
                    </Select>
                </DialogBody>
                <div className="flex justify-end p-4 border-t border-gray-200 space-x-4">
                    <Button type="submit" color="green">
                        {isEditing ? "Actualizar" : "Guardar"}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}

export default ModalFormUser;

