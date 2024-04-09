# Prueba Técnica para Desarrollador Full Stack

## Descripción
El objetivo de esta prueba es evaluar tus habilidades en el desarrollo de aplicaciones full stack, creando un sistema simple de gestión de usuarios con autenticación. Este sistema deberá incluir un back-end desarrollado en **JavaScript** o **TypeScript** y un front-end utilizando **React**.

### Funcionalidades
El sistema cuenta con las siguientes funcionalidades:

- CRUD de usuarios con permisos de administrador.

### Requisitos
Asegúrate de tener instalados los siguientes requisitos:

- Node.js
- PostgreSQL

## Instalación
Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias ejecutando `npm install` dentro de las carpetas `frontend` y `backend`.
3. Configura la conexión a la base de datos.

### Ejecución de Seeders
Antes de iniciar, ejecuta los siguientes seeders para crear Roles y Usuarios por defecto:

1. Generar Roles: `npm run db:seed createRoles`
2. Generar Usuarios: `npm run db:seed createUsers`

## Usuarios para probar login
Correo: admin@example.com
Password: admin123

Correo: user@example.com
Password: user123

### Iniciar Servidores
Para iniciar los servidores, ejecuta los siguientes comandos:

- Servidor de cliente: `npm run dev`
- Servidor de base de datos: `npm run dev`

## Contribución
Actualmente, este proyecto no acepta contribuciones externas debido a que el código es privado. Sin embargo, si tienes sugerencias o comentarios, puedes enviarlos a través de la sección de Issues en este repositorio.

## Licencia
La aplicación es de acceso público y gratuito, pero el código es privado. Se prohíbe la reproducción o modificación del código sin el consentimiento explícito del propietario. Para más detalles sobre la licencia, consulta el archivo
