import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import GuardianLayout from "./components/layouts/GuardianLayout"
import StaffLayout from "./components/layouts/StaffLayout"
import AdminLayout from "./components/layouts/AdminLayout"
import GuardianDashboard from "./pages/GuardianDashboard"
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/protectedRoutes/PublicRoute"
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import NotificationsPage from "./pages/Notifications"

export function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="GUARDIAN" />}>
          <Route element={<GuardianLayout />}>
            <Route
              path="/guardian/dashboard"
              element={<GuardianDashboard />}
            />
            <Route
              path="/guardian/dependents"
              element={<GuardianDashboard />}
            />
            <Route
              path="/guardian/notifications"
              element={<NotificationsPage />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="STAFF" />}>
          <Route element={<StaffLayout />}>
            <Route
              path="/staff/dashboard"
            // element={<StaffDashboard />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
            // element={<AdminDashboard />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} transition={Flip} />
    </>

  )
}

export default App
