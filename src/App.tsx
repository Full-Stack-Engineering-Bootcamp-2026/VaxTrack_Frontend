import { Route, Routes } from "react-router-dom"
import Login from "./pages/guardian/Login"
import CreateAccount from "./pages/guardian/CreateAccount"
import GuardianLayout from "./components/layouts/GuardianLayout"
import StaffLayout from "./components/layouts/StaffLayout"
import AdminLayout from "./components/layouts/AdminLayout"
import GuardianDashboard from "./pages/guardian/GuardianDashboard"
import { Flip, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PublicRoute from "./components/protectedRoutes/PublicRoute"
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"
import ForgotPassword from "./pages/guardian/ForgotPassword"
import ResetPassword from "./pages/guardian/ResetPassword"
import NotificationsPage from "./pages/guardian/Notifications"
import NotFound from "./pages/404"
import StaffDashboard from "./pages/staff/StaffDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import StaffManagement from "./pages/admin/StaffManagement"
import ProfilePage from "./pages/profile/ProfilePage"
import StaffVaccinesPage from "./pages/staff/StaffVaccinePage"

export function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="GUARDIAN" />}>
          <Route element={<GuardianLayout />}>
            <Route path="/guardian/dashboard" element={<GuardianDashboard />} />
            <Route
              path="/guardian/dependents"
              element={<GuardianDashboard />}
            />
            <Route
              path="/guardian/notifications"
              element={<NotificationsPage />}
            />
            <Route path="/guardian/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="STAFF" />}>
          <Route element={<StaffLayout />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/vaccines" element={<StaffVaccinesPage />} />
            <Route path="/staff/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/staff-management"
              element={<StaffManagement />}
            />
            <Route path="/admin/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} transition={Flip} />
    </>
  )
}

export default App
