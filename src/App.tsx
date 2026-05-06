import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import GuardianLayout from "./components/layouts/GuardianLayout"
import StaffLayout from "./components/layouts/StaffLayout"
import AdminLayout from "./components/layouts/AdminLayout"
import GuardianDashboard from "./pages/GuardianDashboard"

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateAccount />} />
      <Route element={<GuardianLayout />}>
        <Route
          path="/guardian/dashboard"
          element={<GuardianDashboard />}
        />
      </Route>
      <Route element={<StaffLayout />}>
        <Route
          path="/staff/dashboard"
        // element={<StaffDashboard />}
        />
      </Route>
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
        // element={<AdminDashboard />}
        />
      </Route>
    </Routes>
  )
}

export default App
