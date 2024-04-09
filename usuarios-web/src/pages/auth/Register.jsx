import React, { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import AuthServicios from "../../services/AuthServicios";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "../../providers/AlertContext";

export function Register() {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [user, setUser] = useState({
        nombre: "",
        apepat: "",
        apemat: "",
        correo: "",
        contrasenia: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const dataToSend = {
            nombre: user.nombre,
            apepat: user.apepat,
            apemat: user.apemat,
            correo: user.correo,
            contrasenia: user.contrasenia,
            rol_id: 2,
        };
        try {
            const response = await AuthServicios.register(dataToSend);
            console.log(response.data);
            showAlert("Usuario registrado con éxito", "success");
            navigate('/login');

        } catch (error) {
            console.error("Error al registrar:", error.response ? error.response.data : error.message);
            let errorMessage = 'Error desconocido al intentar registrar usuario.';
            if (error.response) {
                errorMessage = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
            }
            showAlert(errorMessage, "error");
            
        }
    };
    
    return (
        <div class="flex items-center justify-center min-h-screen">
            <div
                class="relative flex flex-col m-2 space-y-5 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div class="flex flex-col justify-center p-7 md:p-7">
                    <span class="mb-3 text-4xl font-bold">Registro!</span>
                    <span class="font-light text-gray-400 mb-8">
                        Rellena los campos para registrarte
                    </span>
                    <form className="" onSubmit={handleSubmit}>
                        <div>
                            <span class="mb-2 text-md">Nombre</span>
                            <Input
                                type="text"
                                outline={true}
                                placeholder="Nombre"
                                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"

                                name="nombre"
                                value={user.nombre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div class="py-4">
                                <span class="mb-2 text-md">Apellido Paterno</span>
                                <Input
                                    type="text"
                                    color="lightBlue"

                                    outline={true}
                                    placeholder="Apellido Paterno"
                                    name="apepat"
                                    value={user.apepat}
                                    onChange={handleChange}
                                    class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                />
                            </div>
                            <div class="py-4">
                                <span class="mb-2 text-md">Apellido Materno</span>
                                <Input
                                    type="text"
                                    outline={true}
                                    placeholder="Apellido Materno"
                                    name="apemat"
                                    value={user.apemat}
                                    onChange={handleChange}
                                    class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                        <div class="py-4">
                            <span class="mb-2 text-md">Correo Electronico</span>
                            <Input
                                type="email"
                                outline={true}
                                placeholder="Correo Electrónico"
                                name="correo"
                                value={user.correo}
                                onChange={handleChange}
                                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            />
                        </div>
                        <div class="py-4">
                            <span class="mb-2 text-md">Contraseña</span>
                            <Input
                                type="password"
                                outline={true}
                                placeholder="Contraseña"
                                name="contrasenia"
                                value={user.contrasenia}
                                onChange={handleChange}
                                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            color="lightBlue"
                            size="lg"
                            className="mt-4 w-full"
                        >
                            Registrarse
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Register;
