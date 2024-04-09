import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthServicios from '../services/AuthServicios'; 
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const verifyUser = async () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (correo, contrasenia) => {
    try {
      const response = await AuthServicios.login({ correo, contrasenia });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.usuario));
        setCurrentUser(response.data.usuario);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión', error);
      throw error;
    } finally {
      setIsLoading(false); 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoading(false); 
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Cargando...</div>}
    </AuthContext.Provider>
  );
};
