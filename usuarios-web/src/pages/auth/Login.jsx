import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../providers/AuthContext";
import { useAlert } from "../../providers/AlertContext";


export function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const { showAlert } = useAlert();

    const [credentials, setCredentials] = useState({
        correo: '',
        contrasenia: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.correo, credentials.contrasenia);
            showAlert("Acción completada con éxito", "success");
            navigate('/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            let errorMessage = 'Error desconocido al intentar iniciar sesión.';

            if (error.response && error.response.data) {
                errorMessage = error.response.data.msg || error.response.data.message || error.response.data.error || 'Error al procesar la solicitud.';
                errorMessage = typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage;
            }
            showAlert(errorMessage, "error");
        }
    };



    return (
        <div class="flex items-center justify-center min-h-screen">
            <div
                class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                <div class="flex flex-col justify-center p-8 md:p-14">
                    <span class="mb-3 text-4xl font-bold">Bienvenido!</span>
                    <span class="font-light text-gray-400 mb-8">
                        Pagina para el registro usuarios
                    </span>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <span class="mb-2 text-md">Correo Electronico</span>
                            <Input
                                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                type="text"
                                placeholder="Correo Electrónico"
                                name="correo"
                                value={credentials.correo}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="py-4">
                            <span class="mb-2 text-md">Contraseña</span>
                            <Input
                                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                type="password"
                                placeholder="Contraseña"
                                name="contrasenia"
                                value={credentials.contrasenia}
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            color="lightBlue"
                            className="w-full"
                        >
                            Iniciar Sesión
                        </Button>

                        <div class="flex items-center justify-between">
                            <Link to="/register" class="text-sm text-dark hover:text-gray-500 ">Registrarme</Link>
                        </div>



                    </form>

                </div>
                <div class="relative">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Rd2j2H28cgH_a9h7_xJWaCLL9byYbNziie-e2mRlZg&s"
                        alt="img"
                        class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                    />
                    <div
                        class="absolute hidden bottom-10 right-6 p-6 bg-gray-700 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                    >
                        <span class="text-white text-xl"
                        >Prueba Técnica<br />Kairmnot
                            <br /><span className="text-sm text-gray-00" >Power by: Josias Dhz</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
