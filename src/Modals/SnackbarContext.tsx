import React, { createContext, useContext, useState, ReactNode } from 'react';
import AppSnackbar from './AppSnackbar';

type SnackbarSeverity = 'success' | 'error';

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within SnackbarProvider');
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('success');
  const [duration, setDuration] = useState(4000);

  const showSnackbar = (msg: string, sev: SnackbarSeverity = 'success', dur = 4000) => {
    setMessage(msg);
    setSeverity(sev);
    setDuration(dur);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <AppSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
        duration={duration}
      />
    </SnackbarContext.Provider>
  );
};
