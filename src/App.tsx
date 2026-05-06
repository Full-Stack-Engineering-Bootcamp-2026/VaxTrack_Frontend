import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateAccount />} />
    </Routes>
  )
}

export default App
