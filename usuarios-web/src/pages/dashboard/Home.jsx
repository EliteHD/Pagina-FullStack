import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import ModalFormUser from "./users/components/ModalFormUser";
import { useState, useEffect } from "react";
import UsuarioServicios from "../../services/UsuarioServicios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const TABLE_HEAD = ["Usuario", "Rol", "Telefono", "Fecha de Nacimiento", "Acciones"];

function generateAvatar(name) {
  // Función para generar la imagen de avatar
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  const colors = [
    "#f44336",
    "#9c27b0",
    "#3f51b5",
    "#2196f3",
    "#4caf50",
    "#ff9800",
    "#ff5722",
    "#795548",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill="${randomColor}" />
      <text x="50" y="50" text-anchor="middle" dy="0.35em" fill="#ffffff" font-size="40">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UsuarioServicios.getAll();
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleOpenModal = (userData = null) => {
    setIsModalOpen(true);
    if (userData) {
      setIsEditing(true);
      setEditingUserData(userData);
    } else {
      setIsEditing(false);
      setEditingUserData(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingUserData(null);
  };

  const handleSaveUser = (userData) => {
    console.log(userData);
    handleCloseModal();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }} >
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Button onClick={() => handleOpenModal()} className="flex items-center w-full md:w-72 bg-gray-700 " size="md">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> {isEditing ? "Editar Usuario" : "Agregar Usuario"}
              </Button>
              {isModalOpen && (
                <ModalFormUser
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  userData={editingUserData}
                  onSave={handleSaveUser}
                />
              )}
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(({ id, nombre, apepat, apemat, correo, contrasenia, telefono, birthdate, rol }) => (
                  <tr key={id}>
                    <td className="p-4 ">
                      <div className="flex items-center gap-3 ">
                        <Avatar src={generateAvatar(nombre)} alt={nombre} size="sm" />
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {nombre} {apepat} {apemat}
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            {correo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center ">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={rol.nombre}
                        color="green"
                      />
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {telefono}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {birthdate}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Editar Usuario">
                        <IconButton variant="text" onClick={() => handleOpenModal({ id, nombre, apepat, apemat, correo, contrasenia, telefono, birthdate, rol })}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
}

export default Home;
