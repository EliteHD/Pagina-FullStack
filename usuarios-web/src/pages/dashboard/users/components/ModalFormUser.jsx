
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

function ModalFormUser({ isOpen, onClose, userData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState([]);
    const [rolActual, setRolActual] = useState(""); // Estado para almacenar el nombre del rol actual

    const [formData, setFormData] = useState({
        nombre: "",
        apepat: "",
        apemat: "",
        correo: "",
        contrasenia: "",
        telefono: "",
        birthdate: "",
        rol_id: "", // Inicializado como vacío
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await RolServicios.getAll();
                setRoles(response.data); // Almacena los roles en el estado local
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles(); // Al cargar el componente, obtén los roles disponibles
        if (userData) {
            setIsEditing(true);
            // Aquí debes asegurarte de desestructurar userData y asignar el rol_id correctamente
            setFormData({
                ...userData,
                rol_id: userData.rol?.id || '', // Asume que userData.rol contiene el objeto del rol con una propiedad id
            });
            setRolActual(userData.rol.nombre); // Almacena el nombre del rol actual

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

        // Verifica si el evento es un objeto Event estándar
        if (e.target) {
            // Evento estándar de un input o select HTML
            ({ name, value } = e.target);
        } else {
            // Para componentes personalizados que no usan un evento estándar
            // Asume que e es el valor directo y que este caso se maneja para el select de roles
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
        console.log("Datos a enviar:", formData); // Para depuración

        try {
            const response = await UsuarioServicios.create(formData);
            console.log("Usuario creado:", response.data);
            onClose(); // Cerrar el modal
            resetFormData(); // Resetear el formulario después de enviar
        } catch (error) {
            console.error("Error al crear usuario:", error);
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
                        {/* Opción para mostrar el nombre del rol actual */}
                        {rolActual && (
                            <Option key={formData.rol_id} value={formData.rol_id}>
                                {rolActual}
                            </Option>
                        )}
                        {/* Resto de opciones de roles */}
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

