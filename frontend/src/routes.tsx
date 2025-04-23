import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

import Login from './components/Login/Login';

import ListRevisao from './components/revisao/ListRevisao.tsx';
import CreateRevisao from './components/revisao/CreateRevisao.tsx';
import UpdateRevisao from './components/revisao/UpdateRevisao.tsx';

import ListVeiculo from './components/veiculo/ListVeiculo.tsx';
import CreateVeiculo from './components/veiculo/CreateVeiculo.tsx';
import UpdateVeiculo from './components/veiculo/UpdateVeiculo.tsx';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authenticated } = useAuth();
  return authenticated ? <>{children}</> : <Navigate to="/user" />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rota de login */}
    <Route path="/user" element={<Login />} />

    {/* Redirecionamento padrão */}
    <Route path="/" element={<Navigate to="/" replace />} />

    {/* Rotas de revisão (protegidas) */}
    <Route
      path="/revisao"
      element={
        <PrivateRoute>
          <ListRevisao />
        </PrivateRoute>
      }
    />
    <Route
      path="/revisao/create"
      element={
        <PrivateRoute>
          <CreateRevisao />
        </PrivateRoute>
      }
    />
    <Route
      path="/revisao/update/:id"
      element={
        <PrivateRoute>
          <UpdateRevisao />
        </PrivateRoute>
      }
    />

    {/* Fallback */}

        {/* Rotas de revisão (protegidas) */}
        <Route
      path="/veiculo"
      element={
        <PrivateRoute>
          <ListVeiculo />
        </PrivateRoute>
      }
    />
    <Route
      path="/veiculo/create"
      element={
        <PrivateRoute>
          <CreateVeiculo />
        </PrivateRoute>
      }
    />
    <Route
      path="/veiculo/update/:id"
      element={
        <PrivateRoute>
          <UpdateVeiculo />
        </PrivateRoute>
      }
    />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
