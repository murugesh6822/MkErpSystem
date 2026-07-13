import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/Auth/LoginPage';
import Dashboard from '../Pages/Dashboard/Dashboard';
import LeadListPage from '../Pages/Leads/Leadlistpage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<LeadListPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
