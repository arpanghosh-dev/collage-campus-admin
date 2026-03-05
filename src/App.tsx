import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './Index.css';

// ---------------------------------

import DashboardLayout from './layout/DashboardLayout';
// auth
import Login from './Page/Auth/Login';
import ForgotPassword from './Page/Auth/ForgotPassword';
import ResetPassword from './Page/Auth/ResetPassword';
// dashboard
import Dashboard from './Page/Dashboard/Dashboard';

// ---------------------------------

// App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* ---------------------------------------------------------------- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        {/* ------------------------------------------------------------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
