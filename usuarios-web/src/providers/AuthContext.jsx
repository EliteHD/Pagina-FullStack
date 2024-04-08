import React, { createContext, useContext, useState } from 'react';

// Crear un contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Simula un inicio de sesión
  const login = (email, password) => {
    // Aquí iría la lógica para autenticar al usuario
    setCurrentUser({ email: email });
  };

  // Simula un cierre de sesión
  const logout = () => {
    setCurrentUser(null);
  };

  // Valores proporcionados por el contexto
  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
