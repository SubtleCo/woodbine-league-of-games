import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../auth/AdminAuthContext';

export default function AdminRoute() {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/admin/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
}
