import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboardPage from "../Pages/Admin/AdminDashboardPage";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import RequireAdminLogin from "../Store/Protector/RequireAdminLogin";
import RequireAdminAuth from "../Store/Protector/RequireAdminAuth";
import AdminUpdatePage from "../Pages/Admin/AdminUpdatePage";
import AdminAddUserPage from "../Pages/Admin/AdminAddUserPage";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/adminlogin"
          element={
            <RequireAdminLogin>
              <AdminLoginPage />
            </RequireAdminLogin>
          }
        />
        <Route
          path="/admindashbord"
          element={
            <RequireAdminAuth>
              <AdminDashboardPage />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/adminupdate/:id"
          element={
            <RequireAdminAuth>
              < AdminUpdatePage/>
            </RequireAdminAuth>
          }
        />

        <Route 
        path="/adminadduser"
        element = {
          <RequireAdminAuth>
            <AdminAddUserPage/>
          </RequireAdminAuth>
        }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
