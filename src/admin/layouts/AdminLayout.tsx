import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLayout = () => {
  const { user } = useAdminAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f5f7f9] font-sans text-[#0e1216]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-[#f5f7f9] p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

