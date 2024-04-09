import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: '', type: '' });

  const showAlert = useCallback((message, type = 'info') => {
    setAlert({ open: true, message, type });
    setTimeout(() => setAlert({ open: false, message: '', type: '' }), 5000); // Cierra la alerta después de 5 segundos
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
