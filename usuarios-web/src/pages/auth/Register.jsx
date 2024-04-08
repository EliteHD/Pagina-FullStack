import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Register() {
    return (
        <div class="flex items-center justify-center min-h-screen">
            <div
                class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                 <div class="relative">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Rd2j2H28cgH_a9h7_xJWaCLL9byYbNziie-e2mRlZg&s"
                        alt="img"
                        class="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
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
                <div class="flex flex-col justify-center p-8 md:p-14">
                    <span class="mb-3 text-4xl font-bold">Registro!</span>
                    <span class="font-light text-gray-400 mb-8">
                        Rellena los campos para registrarte
                    </span>
                    <div class="py-4">
                        <span class="mb-2 text-md">Correo Electronico</span>
                        <input
                            type="text"
                            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            name="email"
                            id="email"
                        />
                    </div>
                    <div class="py-4">
                        <span class="mb-2 text-md">Contraseña</span>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        />
                    </div>
                    <button
                        class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                    >
                        Iniciar Sesión
                    </button>
                </div>
               
            </div>
        </div>
    );
}

export default Register;
