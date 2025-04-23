// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from './components/menu/ThemeProvider';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
