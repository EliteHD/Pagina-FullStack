import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAlert } from '../providers/AlertContext';

export function Notification() {
  const {
    alert: { open, message, type },
  } = useAlert();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      style={{ zIndex: 14000 }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className='mt-20 '

    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
