import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertDismissible } from '../components/AlertDismissible';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ open: false, message: '' });

    const showAlert = useCallback((message) => {
        setAlert({ open: true, message });
        // Opcionalmente, establece un tiempo para cerrar la alerta automáticamente
        setTimeout(() => setAlert({ open: false, message: '' }), 5000);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <AlertDismissible message={alert.message} open={alert.open} setOpen={(open) => setAlert((alert) => ({ ...alert, open }))} />
        </AlertContext.Provider>
    );
};
